# Photo Vault

A full-stack photo gallery application built with a Rails API-only mode backend and a React (Vite) frontend. 

You can live test it here
https://monorepo-frontend-production.up.railway.app/signin

Feel free to create your own user or use this test user:

 username: 
`test@example.com`
 password: 
`password`

## ✨ Key Features

User Authentication: including user registration, login (has_secure_password), and logout.

Token-Based Sessions: Uses JSON Web Tokens (JWT) for stateless, API communication.

Authenticated Photo Gallery: Users can view a feed of photos populated from a curated list.

Liking System: Users can like and unlike photos, with the UI updating in real-time.

Interactive UI: Features include a modal for viewing larger images and a "copy to clipboard" function for photo colors.

Responsive Design: A clean, mobile-friendly layout built with Tailwind CSS.

## 🛠️ Tech Stack

Backend: Ruby on Rails 8, PostgreSQL

Frontend: React 18, Vite, Tailwind CSS, axios, React Router

Authentication: bcrypt, jwt

Testing: Minitest, Vitest, React Testing Library, MSW

Deployment: Railway

## 🚀 How to run the project?


First, set up the Rails API server:

On the backend folder

Install Ruby dependencies with

`bundle install`

Create, migrate, and seed the database with sample data running

`rails db:reset`

Frontend Setup:

On the frontend folder

Install Node.js dependencies with

`npm install`

Finally run the application with two separate terminal windows running at the same time

In Terminal 1 (Backend):

`rails s`

The Rails API will be running at http://localhost:3000.

In Terminal 2 (Frontend):

`npm run dev`

The React application will be available at http://localhost:5173.

To run the existing tests

`rails test` 

`npm test` 

---

API Overview

The API provides the following endpoints to interact with the existing data:

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| `POST` | `/api/v1/users` | Register a new user account | Not Required |
| `POST` | `/api/v1/authenticate` | Log in a user and receive a JWT | Not Required |
| `GET` | `/api/v1/photos` | Get the list of all photos | **Required** |
| `POST` | `/api/v1/photos/:photo_id/likes` | Like a photo for the current user | **Required** |
| `DELETE` | `/api/v1/photos/:photo_id/likes/:id` | Unlike a photo for the current user | **Required** |