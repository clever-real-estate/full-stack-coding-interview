# Clever Photos

Clever Photos is a full-stack web application that allows users to browse a gallery of photos, like their favorite ones, and view details about each photo. It features a React-based frontend and a Ruby on Rails API backend.

This project was originally a coding challenge from Clever, which has been completed.

## Features

- **User Authentication:** Sign in to a secure account to access the photo gallery.
- **Photo Gallery:** View a collection of beautiful photos with details.
- **Like Photos:** Like and unlike photos, with changes persisted in the database.
- **Download Photos:** Download high-quality versions of the photos.
- **Responsive Design:** The application is designed to be usable on various screen sizes.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, React Router, Tailwind CSS
- **Backend:** Ruby on Rails, SQLite, Devise (for authentication), JWT (for sessions)

## Getting Started

To run this project, you'll need to set up both the backend API and the frontend client. You can either run them in separate terminals or use `overmind` to run both with a single command.

### Prerequisites

- [Ruby](https://www.ruby-lang.org/en/documentation/installation/) and Bundler
- [Node.js](https://nodejs.org/en/download/) and Yarn

### 1. Initial Setup

First, install the necessary dependencies for both the API and the client.

```bash
# Install Ruby dependencies for the API
(cd clever_photos_api && bundle install)

# Install JavaScript dependencies for the client
(cd clever_photos && yarn install)

# Create the .env file for the client
(cd clever_photos && cp .env.example .env)
```

Ensure the `.env` file in `clever_photos` points to your local backend API:
`VITE_API_URL=http://localhost:3000`

### 2. Database Setup

Set up the SQLite database and seed it with initial data.

```bash
# Create, migrate, and seed the database
(cd clever_photos_api && rails db:create db:migrate db:seed)
```

### 3. Running the Application

You have two options for running the application:

#### Option A: Run with Overmind (Recommended)

Use `overmind` to start both the API and client processes with a single command from the project root.

```bash
# Start both servers
overmind start
```

The API will be available at `http://localhost:3000` and the client at `http://localhost:5173`.

#### Option B: Run Manually

Run each service in a separate terminal.

```bash
# In terminal 1, start the Rails API
(cd clever_photos_api && rails server)
```

```bash
# In terminal 2, start the React client
(cd clever_photos && yarn dev)
```

### Test Users

You can use the following credentials to sign in, which are created when you seed the database:

- **Email:** `test@test.com`
- **Password:** `password`

---

_Assets provided by Clever: `logo.svg`, `links.svg`, `star-fill.svg`, `star-line.svg`._
