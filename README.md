# Photo Gallery App

A full-stack photo gallery application built with Django (backend) and React with TypeScript (frontend). Users can sign up, sign in, reset passwords, and like/unlike photos. The app displays a responsive, mobile-friendly gallery of photos fetched from a Django REST API.

## Features

* User authentication (Sign Up, Sign In)
* Password reset functionality
* JWT-based auth with `djangorestframework-simplejwt`
* View up to 10 photos (imported from CSV)
* Like/Unlike photos (toggle behavior)
* Responsive grid layout on desktop and mobile
* Clean, modular code structure

## Technology Stack

* **Backend**: Django, Django REST Framework, Simple JWT, django-environ
* **Frontend**: React, TypeScript, React Router, Context API, Recat Hooks, Axios, CSS Modules
* **Styling**: Pure CSS Modules for scoped, responsive styles

## Prerequisites

* Python 3.10+ (with pip)
* Node.js 16+ and npm or Yarn
* (Optional) Docker & Docker Compose

## Repo Structure

```
photo-gallery/
├── backend/                # Django project
│   ├── config/             # settings, URLs, WSGI/ASGI
│   ├── apps/
│   │   ├── accounts/       # auth, register, password reset
│   │   └── photos/         # Photo models, like/unlike, import command
│   ├── data/               # photos.csv
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React app
│   ├── src/
│   │   ├── assets/         # SVGs (logo, icons)
│   │   ├── components/     # PhotoCard, etc.
│   │   ├── hooks/          # useAuth
│   │   ├── pages/          # SignIn, SignUp, ResetPassword, Photos
│   │   ├── services/       # API calls
│   │   ├── types.ts        # TS interfaces
│   │   └── styles/         # CSS Modules
│   ├── package.json
│   └── tsconfig.json
├── .env.example            # sample environment variables
└── README.md
```

---

## Setup & Running Locally

### 1. Clone the repo

### 2. Backend

1. Create and activate a virtual environment:

   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate    # macOS/Linux
   .\venv\\Scripts\\activate  # Windows PowerShell
   ```
2. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and adjust values:

   ```bash
   cp .env.example .env
   ```
4. Apply migrations and import photos(This imports photos data from csv.):

   ```bash
   python manage.py migrate
   python manage.py import_photos
   ```
5. Run the Django development server:

   ```bash
   python manage.py runserver
   ```

### Testing Guide

```
python manage.py test apps.accounts.tests.AccountsTests

python manage.py test apps.photos.tests.PhotosTests
```

The backend API will be available at [http://localhost:8000/api/](http://localhost:8000/api/).

### 3. Frontend

1. In a new terminal window, navigate to the frontend folder:

   ```bash
   cd ../frontend
   ```
2. Install npm or Yarn dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in `frontend/` with:

   ```bash
   REACT_APP_API_URL=http://localhost:8000/api
   ```
4. Start the React development server:

   ```bash
   npm start
   # or
   yarn start
   ```

Your React app will run at [http://localhost:3000](http://localhost:3000).

---

## Scripts

### Backend

* `python manage.py runserver` – start dev server
* `python manage.py migrate` – apply migrations
* `python manage.py import_photos` – import data from `photos.csv`

### Frontend

* `npm start` / `yarn start` – run dev server
* `npm build` / `yarn build` – build production bundle

---
