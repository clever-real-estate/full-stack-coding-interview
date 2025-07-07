# Clever Photos API

This is the backend API for a photo-sharing application. It allows users to view photos, like them, and unlike them.

## Features

- User authentication (login/logout)
- Browse all photos
- View a single photo
- Like a photo
- Unlike a photo

## API Endpoints

All endpoints are prefixed with `/api/v1`.

| Method   | Endpoint             | Description        |
| -------- | -------------------- | ------------------ |
| `POST`   | `/users/sign_in`     | User login         |
| `DELETE` | `/users/sign_out`    | User logout        |
| `GET`    | `/photos`            | Get all photos     |
| `GET`    | `/photos/:id`        | Get a single photo |
| `POST`   | `/photos/:id/like`   | Like a photo       |
| `DELETE` | `/photos/:id/unlike` | Unlike a photo     |

## Technologies Used

- Ruby on Rails
- SQLite
- Devise for authentication
- JWT for session management
- RSpec for testing

## Getting Started

To get the application up and running, follow these steps:

### Prerequisites

- Ruby **3.2.2**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Clever/full-stack-coding-interview.git
   ```

2. **Install dependencies:**

   ```bash
   bundle install
   ```

3. **Set up credentials and JWT secret:**

   Rails uses an encrypted file to store secrets (`config/credentials.yml.enc`), which is decrypted using a master key (`config/master.key`). The master key is not checked into version control. `devise-jwt` also requires a secret key to sign tokens.

   First, generate a secure secret for JWT:

   ```bash
   bundle exec rails secret
   ```

   Copy the generated key.

   Next, edit the credentials file:

   ```bash
   bundle exec rails credentials:edit
   ```

   This command will create `config/master.key` if it doesn't exist and open the encrypted credentials file. Add the JWT secret you generated:

   ```yaml
   jwt_secret_key: <your-pasted-secret-key>
   ```

   Save and close the file.

4. **Create the database:**

   ```bash
   rails db:create
   ```

5. **Run the migrations:**

   ```bash
   rails db:migrate
   ```

6. **Seed the database:**

   ```bash
   rails db:seed
   ```

7. **Run the tests:**

   ```bash
   rspec
   ```

8. **Start the server:**
   ```bash
   rails server
   ```

The API will be available at `http://localhost:3000/api/v1`.

## Test Users

The seed data creates two test users:

- **Email:** `test@test.com`
- **Password:** `password`

- **Email:** `test2@test.com`
- **Password:** `password`
