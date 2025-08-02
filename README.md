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

### 🧪 Unit Testing
- Add **unit tests** for components and utility functions using `Vitest` or `Jest` for better reliability and future-proofing.
- Set up coverage reports and test watch mode for fast feedback.

---

## 🧠 Backend (Flask)

### 🧪 Testing
- Add **unit and integration tests** using `pytest` and `coverage`.

### 🗃️ Database & Migrations
- Replace SQLite with **PostgreSQL** for better scalability and performance.
- Set up a **robust migration system** using `Flask-Migrate` to handle schema changes reliably in different environments.

### 🛑 Error Handling
- Add **custom exception classes** to improve error clarity, reduce repetition, and return consistent API error responses.


