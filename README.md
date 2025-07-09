# Photo Gallery - Full Stack Application

![Cover Image](/frontend/public/cover.jpeg)

A modern photo gallery application with Django REST API backend and React TypeScript frontend. Features secure authentication, photo management, user profiles, and responsive design.

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose** (recommended)
- **OR** Manual setup:
  - Python 3.11+ with pip
  - Node.js 20+ with npm
  - MySQL 8.0+
  - Redis 7.0+

### 🐳 Docker Setup

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd clever-full-stack-coding-interview
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start all Redis & MySQL services:**
   ```bash
   docker-compose up -d
   ```


### 💻 Manual Development Setup

#### Backend Setup
```bash
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
cd backend
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py import_photos ../photos.csv
python3 manage.py runserver
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🛠️ Development Tools

### Code Quality & Formatting

- **Backend:** Black & isort
- **Frontend:** Prettier, ESLint, TypeScript
- **Commit Messages:** Conventional Commits

### Git Workflow

```bash
# Make changes
git add .

# Commit with conventional format
git commit -m "feat: add new photo upload feature"
```

## 📊 Features Implemented

### ✅ Core Requirements (All Complete)
- **Functional Sign In:** JWT-based authentication with refresh tokens
- **Protected "All Photos" Page:** Requires authentication to access
- **Photo Display:** Shows photos from CSV with metadata
- **Like Functionality:** Users can like/unlike photos (persisted to database)
- **Mobile Responsive:** Mobile-first design with Tailwind CSS

### ✅ Bonus Features Added
- **User Registration & Profiles:** Complete user management
- **Password Reset:** Email-based password reset flow
- **Search & Filtering:** Available via the API
- **Pagination:** Efficient loading of large photo sets
- **Admin Interface:** Django admin for content management
- **Docker Setup:** Containerized development
- **Security Features:** Rate limiting, CORS, input validation
- **Health Checks:** System monitoring endpoints

## 🔧 Configuration

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - Login with JWT tokens
- `POST /api/auth/refresh/` - Refresh access token
- `POST /api/auth/logout/` - Logout and blacklist tokens
- `POST /api/auth/is-authenticated/` - Check if user is authenticated
- `POST /api/auth/forgot-password/` - Password reset
- `POST /api/auth/change-password/` - Change password
- `PATCH /api/auth/update-profile/` - Update user profile

### Photo Endpoints
- `GET /api/photos/` - List photos (paginated)
- `GET /api/photos/liked/` - Get user's liked photos
- `GET /api/photos/{id}/` - Get photo details
- `POST /api/photos/{id}/like-toggle/` - Like/unlike photo

### System Endpoints
- `GET /api/health/` - System health check

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest --ds=backend.settings_test
```

### API Tests
Feel free to import the provided postman collection to test the API endpoints:
- [Postman Collection](./Clever%20Photo%20Gallery.postman_collection.json)

## 🔒 Security Features

### Backend Security
- JWT token authentication with refresh
- Rate limiting and throttling
- CORS configuration
- SQL injection prevention (Django ORM)
- XSS protection headers
- Input validation and sanitization
- Secure password hashing (bcrypt)
- Environment variable secrets

### Frontend Security
- XSS protection (React sanitization)
- Input validation
- Error message sanitization

## 🚀 Deployment

### Manual Deployment
1. **Backend:** WSGI server (Gunicorn) + Nginx
2. **Frontend:** Static build + CDN
3. **Database:** Managed MySQL service
4. **Cache:** Managed Redis service

## 📈 Next Steps (If More Time)

If this were a real production application, here are the next features I would implement:

### Backend Enhancements
- **Advanced Search:** Elasticsearch integration for complex queries
- **Image Processing:** Automatic thumbnail generation, format optimization
- **User Upload & File Storage:** AWS S3 or CloudFront for scalable storage
- **Real-time Features:** WebSocket support for live notifications
- **Analytics:** User behavior tracking and photo performance metrics
- **API Versioning:** Backward compatibility for mobile apps
- **Background Tasks:** Celery for heavy operations (image processing)
- **Monitoring:** Prometheus/Grafana for system metrics
- **Testing:** Comprehensive API tests with pytest-django

### Frontend Enhancements
- **PWA Features:** Service worker, offline support, app installation
- **Advanced UI:** Virtual scrolling for large photo sets
- **Image Editor:** Basic crop/filter functionality
- **Social Features:** Comments, photo sharing, user following
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support
- **Testing:** Jest unit tests, Playwright e2e tests

### DevOps & Production
- **Monitoring:** Sentry for error tracking
- **Security:** OWASP compliance, vulnerability scanning
- **Performance:** CDN setup, database optimization, caching strategies
- **Backup & Recovery:** Automated backups, disaster recovery plans

## 🤝 Development Process

This application was built following modern development best practices:

1. **Planning:** Analyzed requirements and designed database schema
2. **Backend First:** Built robust API with comprehensive user testing
3. **Frontend Integration:** Created responsive UI consuming the API
4. **Security:** Implemented authentication and authorization throughout
5. **Documentation:** Comprehensive README and inline code documentation
6. **DevOps:** Docker containerization for easy deployment

## 📄 Original Requirements

This project fulfills all requirements from the coding challenge:
- ✅ Functional sign-in page with JWT authentication
- ✅ Protected "All photos" page requiring authentication
- ✅ Photo display using provided CSV data
- ✅ Like functionality with database persistence
- ✅ Mobile responsive design
- ✅ React frontend interfacing with backend API
- ✅ Django backend (Python framework)
- ✅ npm package management
