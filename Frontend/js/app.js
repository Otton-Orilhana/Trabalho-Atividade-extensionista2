// app.js (não-módulo) - integração com backend + fallback local, toasts, export CSV com BOM
window.API_BASE = window.API_BASE || 'http://127.0.0.1:5000/api';

/* ---------------------------
   Objeto lessons
   --------------------------- */
const lessons = {
  1: {
    title: "Básico — Poupança",
    contentId: "lesson-1",
    questions: [
      { q: "O que é orçamento pessoal?", a: ["Um tipo de investimento de baixo risco", "Um plano que organiza receitas e despesas", "Um imposto sobre renda", "Uma conta bancária especial"], correct: 1 },
      { q: "O que significa liquidez?", a: ["Rentabilidade anual de um investimento", "Facilidade de transformar um ativo em dinheiro sem perda significativa", "Imposto cobrado sobre aplicações", "Taxa cobrada por bancos para manter conta"], correct: 1 },
      { q: "Qual é a função da reserva de emergência?", a: ["Financiar investimentos de alto risco", "Pagar despesas inesperadas sem recorrer a crédito caro", "Aumentar o limite do cartão de crédito", "Pagar apenas contas de lazer"], correct: 1 },
      { q: "Pagar a fatura do cartão integralmente evita:", a: ["Taxa de manutenção da conta", "Juros rotativos e encargos por atraso", "Imposto de renda sobre compras", "Perda de pontos de fidelidade"], correct: 1 },
      { q: "O que é poupança?", a: ["Um tipo de ação na bolsa", "Conta para guardar dinheiro com rendimento baixo e alta liquidez", "Um empréstimo do banco para o cliente", "Um seguro de vida"], correct: 1 },
      { q: "Qual é a vantagem de automatizar transferências para poupança?", a: ["Aumenta a taxa de juros automaticamente", "Garante disciplina e consistência no hábito de poupar", "Elimina a necessidade de planilha financeira", "Reduz impostos sobre rendimentos"], correct: 1 },
      { q: "O que é um gasto fixo?", a: ["Despesa que varia todo mês conforme uso", "Despesa recorrente e previsível, como aluguel", "Compra por impulso", "Investimento em ações"], correct: 1 },
      { q: "Qual é o principal risco de parcelar muitas compras no cartão?", a: ["Perder pontos de fidelidade", "Acumular juros e comprometer orçamento futuro", "Aumentar a liquidez do seu dinheiro", "Reduzir o score de crédito automaticamente"], correct: 1 },
      { q: "O que significa “diversificar” investimentos?", a: ["Colocar todo o dinheiro em um único ativo seguro", "Distribuir recursos entre diferentes ativos para reduzir risco", "Investir apenas em imóveis", "Trocar de banco frequentemente"], correct: 1 },
      { q: "Qual é a primeira ação recomendada ao receber salário?", a: ["Gastar com lazer primeiro", "Pagar dívidas e reservar uma parte para poupança/investimento", "Abrir várias contas em bancos diferentes", "Comprar ações imediatamente"], correct: 1 }
    ]
  },
  2: {
    title: "Moderado — Investimentos simples",
    contentId: "lesson-2",
    questions: [
      { q: "O que significa um CDB pagar “110% do CDI”?", a: ["O investimento rende 110% do valor aplicado", "O rendimento acompanha o CDI multiplicado por 1,10", "O imposto sobre o investimento é 110%", "O banco garante 110% do capital investido"], correct: 1 },
      { q: "Por que LCIs e LCAs costumam ser atrativas para pessoa física?", a: ["São garantidas pelo governo federal", "São isentas de Imposto de Renda para pessoa física", "Têm liquidez diária obrigatória", "Pagam dividendos mensais como ações"], correct: 1 },
      { q: "Qual alíquota de IR se aplica a um investimento resgatado em 2 anos?", a: ["22,5%", "20%", "17,5%", "15%"], correct: 3 },
      { q: "O que é “yield” em FIIs?", a: ["Taxa de administração do fundo", "Rendimento anual distribuído em relação ao preço da cota", "Valor mínimo para investir no fundo", "Prazo de carência do investimento"], correct: 1 },
      { q: "Quando um CDB pode ser mais vantajoso que uma LCI, mesmo com IR?", a: ["Quando o CDB tem rendimento bruto suficientemente maior que a LCI isenta", "Nunca; LCI sempre vence por isenção de IR", "Quando o CDB tem carência maior", "Quando o investidor é pessoa jurídica"], correct: 0 },
      { q: "O que é CDI na prática do mercado financeiro?", a: ["Um tipo de título público federal", "Taxa de referência entre bancos usada como benchmark", "Um imposto sobre investimentos", "Um fundo de investimento exclusivo para bancos"], correct: 1 },
      { q: "Qual é a principal diferença entre renda fixa prefixada e pósfixada?", a: ["Prefixada tem rendimento atrelado ao CDI; pósfixada tem taxa fixa", "Prefixada define taxa no momento da aplicação; pósfixada varia conforme índice (ex.: CDI)", "Não há diferença prática entre elas", "Pósfixada é sempre isenta de IR"], correct: 1 },
      { q: "O que significa “carência” em LCIs/LCAs?", a: ["Taxa extra cobrada pelo banco", "Período mínimo em que o dinheiro não pode ser resgatado sem perda", "Garantia do FGC sobre o investimento", "Tipo de imposto aplicado ao título"], correct: 1 },
      { q: "Como calcular rendimento líquido aproximado de um CDB anual com IR?", a: ["Subtrair 10% do rendimento bruto", "Multiplicar rendimento bruto por (1 − alíquota de IR)", "Somar a alíquota de IR ao rendimento bruto", "Dividir rendimento bruto por 2"], correct: 1 },
      { q: "Por que comparar prazos é importante ao escolher um investimento?", a: ["Porque prazos não afetam rendimento nem liquidez", "Porque alíquotas de IR e liquidez variam com o prazo, afetando rendimento líquido", "Porque investimentos de prazo curto sempre rendem mais", "Porque prazos determinam o banco emissor"], correct: 1 }
    ]
  },
  3: {
    title: "Avançado — Ações e riscos",
    contentId: "lesson-3",
    questions: [
      { q: "O que é duration em títulos de renda fixa?", a: ["Tempo mínimo de carência do título", "Medida de sensibilidade do preço do título à variação da taxa de juros", "Taxa de retorno anual do título", "Valor nominal do título no vencimento"], correct: 1 },
      { q: "Em análise fundamentalista, o que é P/L (Preço sobre Lucro)?", a: ["Relação entre preço da ação e lucro por ação, indicando quanto o mercado paga por lucro atual", "Percentual de lucro líquido anual do ativo", "Taxa de administração do fundo de ações", "Índice de liquidez corrente da empresa"], correct: 0 },
      { q: "O que é um ETF (Exchange Traded Fund)?", a: ["Fundo que replica um índice e é negociado em bolsa como uma ação", "Tipo de CDB com liquidez diária", "Produto de seguro de vida com componente de investimento", "Conta poupança com rendimento atrelado ao IPCA"], correct: 0 },
      { q: "Qual o principal risco ao investir em criptomoedas?", a: ["Falta de volatilidade", "Alta volatilidade, risco regulatório e risco de custódia/segurança", "Garantia do FGC que limita perdas", "Tributação inexistente que impede declaração"], correct: 1 },
      { q: "O que é hedge cambial ao investir no exterior?", a: ["Estratégia para aumentar exposição ao câmbio", "Operação para reduzir o risco de variação da taxa de câmbio sobre o investimento", "Tipo de imposto sobre investimentos internacionais", "Conta bancária em moeda estrangeira sem custos"], correct: 1 },
      { q: "Como o rebalanceamento melhora a gestão de risco da carteira?", a: ["Mantendo sempre os mesmos ativos sem alterações", "Ajustando periodicamente a carteira para voltar à alocação alvo, realizando lucros e comprando ativos descontados", "Vendendo todos os ativos quando o mercado sobe", "Aumentando exposição a um único ativo vencedor"], correct: 1 },
      { q: "O que é “short selling” (venda a descoberto)?", a: ["Comprar ações para manter por longo prazo", "Vender um ativo que você não possui, esperando recomprar por preço menor", "Investir em títulos de curto prazo apenas", "Estratégia de diversificação passiva"], correct: 1 },
      { q: "Ao avaliar um FII, por que observar a vacância é importante?", a: ["Vacância indica quantas cotas o fundo possui", "Alta vacância reduz receita de aluguéis e pode diminuir distribuição aos cotistas", "Vacância determina a taxa de administração", "Vacância é irrelevante para fundos de papel"], correct: 1 },
      { q: "O que significa “tracking error” em um ETF?", a: ["Diferença entre o desempenho do ETF e o índice que ele pretende replicar", "Taxa cobrada pelo gestor do ETF", "Número de ativos dentro do ETF", "Prazo de vencimento do ETF"], correct: 0 },
      { q: "Qual é a implicação de alavancagem em investimentos?", a: ["Reduz automaticamente o risco do investimento", "Amplifica ganhos e perdas; aumenta risco de liquidação forçada se mal usada", "Elimina a necessidade de diversificação", "Torna o investimento isento de impostos"], correct: 1 }
    ]
  }
};

/* ---------------------------
   Helpers DOM e storage
   --------------------------- */
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return document.querySelectorAll(sel); }

function getResultsLocal(){ return JSON.parse(localStorage.getItem('quizResults') || '[]'); }
function saveResultLocal(r){
  const current = JSON.parse(localStorage.getItem('currentUser')||'null');
  if (current){ r.userId = current.id; r.username = current.username; } else { r.username = 'Visitante'; }
  const arr = getResultsLocal(); arr.push(r); localStorage.setItem('quizResults', JSON.stringify(arr));
}

/* ---------------------------
   API helpers com fallback
   --------------------------- */
async function fetchResults(){
  try {
    const res = await fetch(`${window.API_BASE}/results`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (e) {
    return getResultsLocal().map(r => ({
      id: r.id || null,
      user_id: r.userId || null,
      user_name: r.username || 'Visitante',
      lesson: r.lesson,
      score: r.score,
      date: r.date
    }));
  }
}

async function saveQuizResult(user_id, lesson, score, date = new Date().toISOString()){
  try {
    const res = await fetch(`${window.API_BASE}/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, lesson, score, date })
    });
    if (!res.ok) {
      const err = await res.json().catch(()=>({error:'unknown'}));
      throw new Error(err.error || 'Erro ao salvar resultado');
    }
    return await res.json();
  } catch (e) {
    saveResultLocal({ lesson, score, date });
    return { ok: false, fallback: true };
  }
}

/* ---------------------------
   Toasts simples para feedback
   --------------------------- */
function showToast(msg, type='info') {
  const el = document.createElement('div');
  el.className = `toast-msg toast-${type}`;
  el.textContent = msg;
  Object.assign(el.style, { position:'fixed', top:'16px', right:'16px', zIndex:9999, padding:'10px 14px', background:'#222', color:'#fff', borderRadius:'6px' });
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 3500);
}

/* ---------------------------
   Util: embaralhar array (Fisher-Yates)
   --------------------------- */
function shuffleArray(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------------------
   Proteção contra submit programático (se solicitado pela página)
   --------------------------- */
(function(){
  try {
    if (!HTMLFormElement.prototype._submit_instrumented) {
      HTMLFormElement.prototype._origSubmit = HTMLFormElement.prototype.submit;
      HTMLFormElement.prototype.submit = function(){ console.warn('form.submit() prevenido nesta página'); };
      HTMLFormElement.prototype._submit_instrumented = true;
    }
  } catch(e){ console.warn('Não foi possível sobrescrever submit', e); }
})();

/* ---------------------------
   Inicialização e bindings
   --------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  if (qs('#questions')) loadQuizPage();
  if (qs('#thermometer')) renderProfile();
  if (qs('#teacher-table')) renderTeacher();
  updateIndexProgress();
  setupLessonButtons();
  bindProfileEdit();
  const clearBtn = qs('#clear-data');
  if (clearBtn) clearBtn.addEventListener('click', ()=> {
    if (!confirm('Limpar todos os dados de teste (users, quizResults)?')) return;
    localStorage.removeItem('quizResults');
    localStorage.removeItem('users');
    localStorage.removeItem('currentUser');
    try { updateIndexProgress(); } catch(e){}
    try { setupLessonButtons(); } catch(e){}
    try { renderProfile(); } catch(e){}
    showToast('Dados de teste removidos', 'info');
  });
});

/* ---------------------------
   Index progress
   --------------------------- */
async function updateIndexProgress(){
  const container = qs('#progress-summary');
  if (!container) return;
  let results;
  try { results = await fetchResults(); } catch(e){ results = getResultsLocal(); }
  const completed = new Set(results.map(r => String(r.lesson)));
  container.textContent = completed.size === 0 ? 'Nenhum quiz feito ainda.' : `${completed.size} / ${Object.keys(lessons).length} lições com quiz concluído(s).`;
}

/* ---------------------------
   Quiz page (com embaralhamento das alternativas)
   --------------------------- */
function loadQuizPage(){
  const params = new URLSearchParams(location.search);
  const lessonId = params.get('lesson') || '1';
  const lesson = lessons[lessonId];
  if (!lesson) {
    if (qs('#lesson-title')) qs('#lesson-title').textContent = 'Quiz não encontrado';
    return;
  }
  if (qs('#lesson-title')) qs('#lesson-title').textContent = lesson.title;
  const container = qs('#questions');
  if (!container) return;
  container.innerHTML = '';

  // Para cada pergunta, criamos uma versão embaralhada das alternativas
  lesson.questions.forEach((q, i) => {
    // cria array de objetos {text, originalIndex}
    const opts = q.a.map((text, idx) => ({ text, originalIndex: idx }));
    const shuffled = shuffleArray(opts);
    // encontra o novo índice da alternativa correta
    const newCorrectIndex = shuffled.findIndex(item => item.originalIndex === Number(q.correct));

    const div = document.createElement('div');
    div.className = 'mb-3 question-block';
    // armazenar o índice correto no bloco para avaliação posterior
    div.dataset.correct = String(newCorrectIndex);

    // monta HTML com as alternativas embaralhadas; value = índice embaralhado
    const optionsHtml = shuffled.map((item, sidx) => `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="q${i}" id="q${i}o${sidx}" value="${sidx}">
        <label class="form-check-label" for="q${i}o${sidx}" data-opt-index="${sidx}">${item.text}</label>
      </div>`).join('');

    div.innerHTML = `<p><strong>${i+1}. ${q.q}</strong></p>` + optionsHtml;
    container.appendChild(div);
  });

  removePendingButton();

  // botão seguro: substitui por clone limpo para remover listeners antigos
  const oldBtn = qs('#submit-quiz');
  if (!oldBtn) return;
  const btn = oldBtn.cloneNode(true);
  btn.type = 'button';
  oldBtn.parentNode.replaceChild(btn, oldBtn);

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    btn.disabled = true;

    const unanswered = [];
    lesson.questions.forEach((q, i) => {
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if (!sel) unanswered.push(i);
    });

    if (unanswered.length > 0) {
      showPendingButton(unanswered.length);
      const firstUnanswered = qs(`#q${unanswered[0]}o0`);
      if (firstUnanswered) firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      btn.disabled = false;
      return;
    }

    removePendingButton();

    // avaliação: comparar com o índice correto armazenado no bloco
    let scoreCount = 0;
    lesson.questions.forEach((q, i) => {
      const qBlock = document.querySelectorAll('.question-block')[i];
      const correctIndex = qBlock ? Number(qBlock.dataset.correct) : NaN;
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      const selectedIndex = sel ? Number(sel.value) : NaN;

      // desabilita todas as opções da pergunta
      const inputs = qBlock ? qBlock.querySelectorAll('input[type="radio"]') : [];
      inputs.forEach(inp => inp.disabled = true);

      if (Number.isFinite(selectedIndex) && Number.isFinite(correctIndex) && selectedIndex === correctIndex) {
        scoreCount++;
        if (qBlock) {
          const label = qBlock.querySelector(`label[for="q${i}o${selectedIndex}"]`);
          if (label) label.classList.add('text-success');
        }
      } else {
        if (qBlock && Number.isFinite(selectedIndex)) {
          const selLabel = qBlock.querySelector(`label[for="q${i}o${selectedIndex}"]`);
          if (selLabel) selLabel.classList.add('text-danger');
        }
        if (qBlock) {
          const correctLabel = qBlock.querySelector(`label[for="q${i}o${correctIndex}"]`);
          if (correctLabel) correctLabel.classList.add('fw-bold', 'text-success');
        }
      }
    });

    const percent = Math.round((scoreCount / lesson.questions.length) * 100);
    const result = { lesson: lessonId, score: percent, date: new Date().toISOString() };

    try { sessionStorage.setItem('quizPendingResult', JSON.stringify(result)); } catch(e){}

    const current = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (current && current.id) {
      try {
        await saveQuizResult(current.id, lessonId, percent);
        if (qs('#result')) qs('#result').innerHTML = `<div class="alert alert-success">Você acertou ${scoreCount}/${lesson.questions.length} — ${percent}% (salvo no servidor)</div>`;
        showToast('Resultado salvo no servidor', 'success');
      } catch (err) {
        saveResultLocal(result);
        if (qs('#result')) qs('#result').innerHTML = `<div class="alert alert-warning">Você acertou ${scoreCount}/${lesson.questions.length} — ${percent}% (salvo localmente)</div>`;
        showToast('Salvo localmente. Será sincronizado ao logar.', 'warning');
      }
    } else {
      saveResultLocal(result);
      if (qs('#result')) qs('#result').innerHTML = `<div class="alert alert-success">Você acertou ${scoreCount}/${lesson.questions.length} — ${percent}% (salvo localmente)</div>`;
      showToast('Salvo localmente. Faça login para sincronizar.', 'info');
    }

    try { sessionStorage.removeItem('quizPendingResult'); } catch(e){}

    updateIndexProgress();
    setupLessonButtons();
    btn.disabled = false;
  }, { once: false });
}

/* ---------------------------
   Profile rendering
   --------------------------- */
function renderProfile(){
  const results = getResultsLocal();
  const completed = new Set(results.map(r => r.lesson));
  const pct = Math.round((completed.size / Object.keys(lessons).length) * 100);
  let level = 'Frio';
  if (pct >= 66) level = 'Correndo';
  else if (pct >= 33) level = 'Andando';
  if (qs('#thermometer')) qs('#thermometer').textContent = `${level} (${pct}% lições concluídas)`;
  if (qs('#profile-stats')) qs('#profile-stats').innerHTML = `<p>Liçōes concluídas: ${[...completed].length} / ${Object.keys(lessons).length}</p>`;
}

/* ---------------------------
   Teacher rendering
   --------------------------- */
async function renderTeacher(){
  const tbody = qs('#teacher-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  let rows;
  try {
    rows = await fetchResults();
  } catch (e) {
    rows = getResultsLocal();
  }
  if (!rows || rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4">Nenhum resultado registrado ainda.</td></tr>';
    return;
  }
  rows.forEach(r => {
    const tr = document.createElement('tr');
    const lessonTitle = lessons[r.lesson] ? lessons[r.lesson].title : r.lesson;
    tr.innerHTML = `<td>${r.user_name || 'Visitante'}</td><td>${lessonTitle}</td><td>${r.score}%</td><td>${new Date(r.date).toLocaleString()}</td>`;
    tbody.appendChild(tr);
  });
}

/* ---------------------------
   Setup lesson buttons
   --------------------------- */
function setupLessonButtons(){
  Object.keys(lessons).forEach(key => {
    const btnId = `#btn-quiz-${key}`;
    const btn = qs(btnId);
    if (!btn) return;
    const results = getResultsLocal().filter(r => String(r.lesson) === String(key));
    if (results.length === 0) {
      btn.textContent = `Fazer quiz do ${lessons[key].title.split('—')[0].trim()}`;
      btn.classList.remove('btn-success');
      btn.classList.add('btn-outline-primary');
      btn.href = `quiz.html?lesson=${key}`;
      btn.title = '';
    } else {
      const last = results[results.length - 1];
      btn.textContent = `Refazer quiz do ${lessons[key].title.split('—')[0].trim()} (vc tem ${last.score}% de acerto)`;
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-success');
      btn.href = `quiz.html?lesson=${key}`;
      try { btn.title = `Último resultado: ${last.score}% — ${new Date(last.date).toLocaleString()}`; } catch(e){ btn.title = ''; }
    }
  });
}

/* ---------------------------
   Pending button helpers
   --------------------------- */
function showPendingButton(count){
  removePendingButton();
  const form = qs('#quiz-form');
  if (!form) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'pending-btn';
  btn.className = 'btn btn-danger mt-3';
  btn.textContent = count > 1 ? `Pendente: assinalar ${count} alternativas` : 'Pendente assinalar alternativas';
  btn.addEventListener('click', () => {
    const lessonId = new URLSearchParams(location.search).get('lesson') || '1';
    const lesson = lessons[lessonId];
    if (!lesson) return;
    for (let i = 0; i < lesson.questions.length; i++) {
      const sel = document.querySelector(`input[name="q${i}"]:checked`);
      if (!sel) {
        const firstOption = qs(`#q${i}o0`);
        if (firstOption) firstOption.scrollIntoView({ behavior: 'smooth', block: 'center' });
        break;
      }
    }
  });
  form.appendChild(btn);
}
function removePendingButton(){ const existing = qs('#pending-btn'); if (existing) existing.remove(); }

/* ---------------------------
   Profile edit binding
   --------------------------- */
function bindProfileEdit(){
  const form = qs('#edit-profile-form');
  if (!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const cur = JSON.parse(localStorage.getItem('currentUser')||'null');
    if (!cur) { alert('Usuário não autenticado'); return; }
    const users = JSON.parse(localStorage.getItem('users')||'[]');
    const user = users.find(u=>u.id===cur.id);
    if (!user) { alert('Usuário não encontrado'); return; }
    user.name = document.getElementById('edit-name').value.trim();
    user.answers = {
      q_invest: document.getElementById('edit-q-invest').value,
      q_sheet: document.getElementById('edit-q-sheet').value,
      q_time: document.getElementById('edit-q-time').value
    };
    let score=0;
    if (user.answers.q_invest==='yes') score+=2;
    if (user.answers.q_sheet==='yes') score+=1;
    if (user.answers.q_time==='2') score+=2; else if (user.answers.q_time==='1') score+=1;
    user.level = score<=2 ? 'Iniciante' : (score<=4 ? 'Intermediário' : 'Experiente');
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ id:user.id, username:user.username, name:user.name }));
    const msgEl = document.getElementById('edit-msg');
    if (msgEl) { msgEl.textContent = 'Perfil atualizado.'; msgEl.className = 'text-success mt-2'; }
    if (qs('#profile-level')) qs('#profile-level').innerHTML = `<strong>Nível:</strong> ${user.level}`;
    if (qs('#user-name')) qs('#user-name').textContent = `Usuário: ${user.name}`;
    const navUser = document.getElementById('nav-user');
    if (navUser) navUser.innerHTML = `Olá, ${user.name} • <a href="#" onclick="logout()" class="text-white">Sair</a>`;
  });
}

/* ---------------------------
   Export CSV (com BOM UTF-8)
   --------------------------- */
function exportResultsCSV(){
  const results = getResultsLocal();
  const users = JSON.parse(localStorage.getItem('users')||'[]');
  if (!results.length) { alert('Nenhum resultado para exportar'); return; }
  const rows = [['Usuário','Lição','Pontuação','Data']];
  results.forEach(r=>{
    const userObj = users.find(u=>u.id===r.userId);
    const displayName = userObj ? userObj.name : (r.username || 'Visitante');
    const lessonTitle = lessons[r.lesson] ? lessons[r.lesson].title : r.lesson;
    rows.push([displayName, lessonTitle, `${r.score}%`, new Date(r.date).toLocaleString()]);
  });
  const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(',')).join('\n');
  const bom = '\uFEFF';
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `quiz-results-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
