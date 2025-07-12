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

# 🚧 Future Improvements (If I Had More Time)

This monorepo lays the foundation for a complete web application, built with **React + Vite** on the frontend and **Flask** on the backend. While the current implementation delivers a solid MVP, here’s what I would have implemented given more time:

---

## 🧩 Frontend (React + Vite)

### 🔐 Advanced User Features
- Full user system with **sign up**, **profile editing**, and **password reset** workflows.
- **Avatar upload and preview** functionality integrated into the user profile page.

### 📷 Photo Upload System
- Upload individual photos with previews and validations.
- Bulk photo import via **CSV file** with automatic parsing and **bulk insert** into the database.

### 💬 Social Features
- Users could **comment on photos** from other users.
- Real-time **photo feed** using WebSockets or SSE.
- Integrated **notification system** for likes, comments, and new uploads.

---

## 🧠 Backend (Flask)

### 🗃️ Database & Migrations
- Replace SQLite with **PostgreSQL** for better scalability and performance.
- Set up a **robust migration system** using `Flask-Migrate` to handle schema changes reliably in different environments.

### 🧱 Business Logic
- Better **separation of concerns** by splitting business rules from route handlers into services/use cases.
- More modular and testable architecture to improve long-term maintainability.

---

## 🧪 Testing & CI/CD (Planned)
- Add **unit and integration tests** using `pytest` and `coverage`.
- Set up **CI pipeline** for linting, testing, and auto-deployments using GitHub Actions.

---
