# EduFin — Projeto Extensionista 2

Aplicação web educativa voltada para **educação financeira**, desenvolvida como parte da disciplina de Atividade Extensionista 2.  
O sistema combina **Frontend** (HTML, CSS, JS) e **Backend** em Flask (Python), oferecendo quizzes interativos, perfil de usuário e painel do professor.

---

## Estrutura do Projeto
Trabalho-Atividade-extensionista2/
├── Backend/        # API Flask + banco SQLite
│   ├── app.py
│   ├── init_db.py
│   ├── requirements.txt
│   └── edufin.db (gerado localmente)
├── Frontend/       # Páginas HTML, CSS e JS
│   ├── index.html
│   ├── quiz.html
│   ├── profile.html
│   ├── teacher.html
│   ├── lesson.html
│   └── js/
│       ├── app.js
│       └── auth.js
└── README.md

---

## Como rodar o projeto localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/Otton-Orilhana/Trabalho-Atividade-extensionista2.git
cd Trabalho-Atividade-extensionista2

# criar ambiente virtual:
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.\.venv\Scripts\Activate.ps1 # Windows PowerShell

#Instalar dependências:
pip install -r Backend/requirements.txt

#Inicializar banco:
python Backend/init_db.py

#Rodar servidor:
python Backend/app.py

# O backend estará disponível em: http://127.0.0.1:5000/api
