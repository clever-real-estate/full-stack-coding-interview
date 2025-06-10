# Clever Photos

A full-stack web application for displaying and interacting with photos.

## Features

- User authentication (signup/login)
- Protected photo gallery
- Like/unlike photos
- Mobile-responsive design

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL
- JWT authentication

### Frontend
- React with TypeScript
- Material-UI
- React Router
- Axios

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd full-stack-coding-interview
```

2. Set up the backend:
```bash
cd backend
npm install
```

3. Create a PostgreSQL database named `clever_photos`

4. Create a `.env` file in the backend directory with the following content:
```
PORT=3001
DB_USER=postgres
DB_HOST=localhost
DB_NAME=clever_photos
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your-secret-key
```

5. Set up the frontend:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm start
```

3. Import the photos data:
```bash
cd backend
npm run import-photos
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## API Endpoints

### Authentication
- POST /api/auth/signup - Create a new user account
- POST /api/auth/login - Login to an existing account

### Photos
- GET /api/photos - Get all photos (requires authentication)
- POST /api/photos/:id/like - Toggle like on a photo (requires authentication)

## Development

### Backend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Next Steps

1. Add user profile management
2. Implement photo upload functionality
3. Add photo comments
4. Implement pagination for photos
5. Add search and filtering capabilities
6. Implement photo categories/tags
7. Add unit and integration tests
8. Set up CI/CD pipeline