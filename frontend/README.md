# 📸 Photo Gallery – Frontend (React + Vite)

This is the frontend for the Photo Gallery app, built with React, TypeScript, and Vite & styled with TailwindCSS. It consumes a Django REST API and handles authentication via HTTP-only cookies.

## 🚀 Features

- ⚡️ Vite-powered React app
- 🎨 TailwindCSS v4 for styling
- 🔐 Secure JWT auth with cookie-based session
- 🌐 Axios with automatic token refresh handling
- 🧪 Ready for local dev or production Docker deployment

## 🛠️ Getting Started (Local Development)

Requirements:

- Node.js 18+
- npm

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`
