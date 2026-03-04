// auth.js - integração simples com backend + fallback local
const API_BASE = 'http://127.0.0.1:5000/api';

// util: sha256 para hash local (mantido para compatibilidade local)
async function sha256(text){
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

function loadUsers(){ return JSON.parse(localStorage.getItem('users')||'[]'); }
function saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }
function getNextId(){ return 'u' + Date.now(); }
function computeLevel(answers){
  let score=0;
  if (answers.q_invest==='yes') score+=2;
  if (answers.q_sheet==='yes') score+=1;
  if (answers.q_time==='2') score+=2; else if (answers.q_time==='1') score+=1;
  if (score<=2) return 'Iniciante';
  if (score<=4) return 'Intermediário';
  return 'Experiente';
}

// registra via backend quando possível, senão local
async function registerUserBackend(data){
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (e) {
    return { error: 'backend_unavailable' };
  }
}

// login via backend quando possível, senão local
async function loginUserBackend(username, password){
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return await res.json();
  } catch (e) {
    return { error: 'backend_unavailable' };
  }
}

// sincroniza resultados locais para o servidor após login
async function syncLocalResultsToServer() {
  const local = JSON.parse(localStorage.getItem('quizResults') || '[]');
  const cur = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!cur || !cur.id || !local.length) return;
  for (const r of local) {
    try {
      await fetch(`${API_BASE}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: cur.id, lesson: r.lesson, score: r.score, date: r.date })
      });
    } catch (e) {
      console.warn('Falha ao sincronizar resultado', r, e);
      // manter local para tentar depois
    }
  }
  // limpar local após tentativa (se preferir manter, comente a linha abaixo)
  localStorage.removeItem('quizResults');
}

// DOM handlers
document.addEventListener('DOMContentLoaded', ()=>{
  const regForm = document.getElementById('register-form');
  if (regForm){
    regForm.addEventListener('submit', async e=>{
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const username = document.getElementById('reg-username').value.trim();
      const password = document.getElementById('reg-password').value;
      const answers = {
        q_invest: document.getElementById('q-invest').value,
        q_sheet: document.getElementById('q-sheet').value,
        q_time: document.getElementById('q-time').value
      };

      // tentar registrar no backend
      const payload = { name, username, password, answers };
      const res = await registerUserBackend(payload);
      if (res && res.ok) {
        // salvar currentUser com id retornado
        localStorage.setItem('currentUser', JSON.stringify({ id: res.user_id, username, name, level: res.level }));
        // sincronizar resultados locais
        await syncLocalResultsToServer();
        window.location.href='index.html';
        return;
      }

      // fallback local (se backend indisponível ou erro)
      const users = loadUsers();
      if (users.find(u=>u.username===username)){ document.getElementById('reg-msg').textContent='Usuário já existe.'; return; }
      const hash = await sha256(password);
      const level = computeLevel(answers);
      const user = { id:getNextId(), name, username, passwordHash:hash, level, answers, created_at:new Date().toISOString() };
      users.push(user); saveUsers(users);
      localStorage.setItem('currentUser', JSON.stringify({ id:user.id, username:user.username, name:user.name }));
      window.location.href='index.html';
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm){
    loginForm.addEventListener('submit', async e=>{
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;
      // tentar backend
      const res = await loginUserBackend(username, password);
      if (res && res.ok && res.user) {
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        // sincronizar resultados locais
        await syncLocalResultsToServer();
        window.location.href='index.html';
        return;
      }
      // fallback local
      const users = loadUsers();
      const user = users.find(u=>u.username===username);
      if (!user){ document.getElementById('login-msg').textContent='Usuário não encontrado.'; return; }
      const hash = await sha256(password);
      if (hash !== user.passwordHash){ document.getElementById('login-msg').textContent='Senha incorreta.'; return; }
      localStorage.setItem('currentUser', JSON.stringify({ id:user.id, username:user.username, name:user.name }));
      await syncLocalResultsToServer();
      window.location.href='index.html';
    });
  }
});

function getCurrentUser(){ return JSON.parse(localStorage.getItem('currentUser')||'null'); }
function logout(){ localStorage.removeItem('currentUser'); window.location.href='index.html'; }
