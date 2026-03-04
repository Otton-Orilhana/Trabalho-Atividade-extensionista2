import sqlite3

DB_PATH = 'edufin.db'

schema = """
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  level TEXT,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS quiz_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  lesson TEXT,
  score INTEGER,
  date TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
"""

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.executescript(schema)
    conn.commit()
    conn.close()
    print("Banco inicializado em", DB_PATH)

if __name__ == '__main__':
    init_db()
