from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import bcrypt

DB_PATH = 'edufin.db'

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def query_one(sql, params=()):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(sql, params)
    row = cur.fetchone()
    conn.close()
    return row

def execute(sql, params=()):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(sql, params)
    conn.commit()
    lastrowid = cur.lastrowid
    conn.close()
    return lastrowid

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    username = data.get('username', '').strip()
    password = data.get('password', '')
    answers = data.get('answers', {})

    if not name or not username or not password:
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400

    existing = query_one('SELECT id FROM users WHERE username = ?', (username,))
    if existing:
        return jsonify({'error': 'Usuário já existe'}), 409

    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

    score = 0
    if answers.get('q_invest') == 'yes': score += 2
    if answers.get('q_sheet') == 'yes': score += 1
    qtime = answers.get('q_time')
    if qtime == '2': score += 2
    elif qtime == '1': score += 1
    level = 'Iniciante' if score <= 2 else ('Intermediário' if score <= 4 else 'Experiente')

    created_at = datetime.utcnow().isoformat()
    user_id = execute(
        'INSERT INTO users (name, username, password_hash, level, created_at) VALUES (?, ?, ?, ?, ?)',
        (name, username, password_hash, level, created_at)
    )

    return jsonify({'ok': True, 'user_id': user_id, 'level': level}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')

    if not username or not password:
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400

    row = query_one('SELECT id, name, password_hash, level FROM users WHERE username = ?', (username,))
    if not row:
        return jsonify({'error': 'Usuário não encontrado'}), 404

    stored_hash = row['password_hash'].encode('utf-8')
    if not bcrypt.checkpw(password.encode('utf-8'), stored_hash):
        return jsonify({'error': 'Senha incorreta'}), 401

    user = {'id': row['id'], 'username': username, 'name': row['name'], 'level': row['level']}
    return jsonify({'ok': True, 'user': user}), 200

@app.route('/api/quiz', methods=['POST'])
def post_quiz():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    lesson = data.get('lesson')
    score = data.get('score')
    date = data.get('date') or datetime.utcnow().isoformat()

    if lesson is None or score is None:
        return jsonify({'error': 'Payload inválido'}), 400

    execute('INSERT INTO quiz_results (user_id, lesson, score, date) VALUES (?, ?, ?, ?)',
            (user_id, str(lesson), int(score), date))
    return jsonify({'ok': True}), 201

@app.route('/api/results', methods=['GET'])
def get_results():
    user_id = request.args.get('user_id')
    lesson = request.args.get('lesson')

    sql = 'SELECT qr.id, qr.user_id, u.name as user_name, qr.lesson, qr.score, qr.date FROM quiz_results qr LEFT JOIN users u ON qr.user_id = u.id'
    params = []
    conds = []
    if user_id:
        conds.append('qr.user_id = ?')
        params.append(user_id)
    if lesson:
        conds.append('qr.lesson = ?')
        params.append(lesson)
    if conds:
        sql += ' WHERE ' + ' AND '.join(conds)
    sql += ' ORDER BY qr.date DESC'

    conn = get_db()
    cur = conn.cursor()
    cur.execute(sql, params)
    rows = [dict(r) for r in cur.fetchall()]
    conn.close()
    return jsonify(rows), 200

if __name__ == '__main__':
    app.run(debug=True)
