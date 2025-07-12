# Monorepo: Vite + React (Frontend) & Flask (Backend)

## 🐳 Running with Docker Compose

In the root folder, run:

```bash
docker compose build
docker compose up
```

## 🧪 Running services separately
Frontend:
```bash
cd frontend
npm install
npm run dev
```

Backend:
```bash
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Linux/macOS:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python run.py
```
Access:

Frontend: http://localhost:5173

Backend: http://localhost:5000

## ⚙️ Requirements
Node.js 20+

Python 3.11+

Docker 20.10+

## Seeded User for login:

Username: 'user1'

Password: 'password1'
