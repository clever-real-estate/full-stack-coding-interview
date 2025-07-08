# Technical Architecture Document
## Photo Gallery Web Application

### 1. System Overview

The Photo Gallery Web Application follows a modern, API-first architecture with clear separation between frontend, backend, and database layers. The system is designed for scalability, security, and maintainability.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Django)      │◄──►│   (Supabase)    │
│                 │    │                 │    │                 │
│ - UI Components │    │ - REST API      │    │ - PostgreSQL    │
│ - State Mgmt    │    │ - Authentication│    │ - User Data     │
│ - Routing       │    │ - Business Logic│    │ - Photo Data    │
│ - API Calls     │    │ - Data Validation│    │ - Like Data     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 2. Frontend Architecture

#### 2.1 Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** npm
- **State Management:** React Context + useState/useReducer
- **HTTP Client:** Fetch API with custom hooks
- **Image Optimization:** Next.js Image component

#### 2.2 Project Structure
```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (redirect to gallery)
│   │   ├── signin/             # Sign-in page
│   │   └── gallery/            # Photo gallery page
│   ├── components/             # Reusable UI components
│   │   ├── auth/
│   │   │   ├── SignInForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── gallery/
│   │   │   ├── PhotoGrid.tsx
│   │   │   ├── PhotoCard.tsx
│   │   │   ├── LikeButton.tsx
│   │   │   └── Pagination.tsx
│   │   └── shared/
│   │       ├── Header.tsx
│   │       ├── Logo.tsx
│   │       └── Loading.tsx
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── usePhotos.ts
│   │   └── useLikes.ts
│   ├── utils/                  # Utility functions
│   │   ├── api.ts              # API client
│   │   ├── auth.ts             # Auth utilities
│   │   └── constants.ts        # App constants
│   └── types/                  # TypeScript definitions
│       ├── auth.ts
│       ├── photo.ts
│       └── api.ts
├── public/                     # Static assets
│   ├── logo.svg
│   ├── star-fill.svg
│   └── star-line.svg
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

#### 2.3 Key Components

**Authentication Flow:**
```typescript
// useAuth hook pattern
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  const signIn = async (email: string, password: string) => {
    // JWT authentication logic
  };
  
  const signOut = () => {
    // Clear tokens and redirect
  };
  
  return { user, loading, signIn, signOut };
};
```

**Photo Gallery Pattern:**
```typescript
// usePhotos hook with pagination
const usePhotos = (page: number = 1) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const fetchPhotos = async (page: number) => {
    // Fetch paginated photos from API
  };
  
  return { photos, totalPages, loading, fetchPhotos };
};
```

### 3. Backend Architecture

#### 3.1 Technology Stack
- **Framework:** Django 5.0 + Django REST Framework
- **Language:** Python 3.11+
- **Authentication:** JWT (djangorestframework-simplejwt)
- **Database ORM:** Django ORM
- **API Documentation:** drf-spectacular (OpenAPI)
- **Testing:** pytest + Django Test Client

#### 3.2 Project Structure
```
backend/
├── src/
│   ├── config/                 # Django settings
│   │   ├── settings/
│   │   │   ├── base.py
│   │   │   ├── development.py
│   │   │   └── production.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── apps/
│   │   ├── authentication/     # User auth app
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   └── urls.py
│   │   ├── photos/             # Photo management app
│   │   │   ├── models.py
│   │   │   ├── serializers.py
│   │   │   ├── views.py
│   │   │   ├── urls.py
│   │   │   └── management/
│   │   │       └── commands/
│   │   │           └── import_photos.py
│   │   └── likes/              # Like system app
│   │       ├── models.py
│   │       ├── serializers.py
│   │       ├── views.py
│   │       └── urls.py
│   ├── utils/                  # Shared utilities
│   │   ├── authentication.py
│   │   ├── pagination.py
│   │   └── permissions.py
│   └── tests/                  # Test modules
│       ├── test_authentication.py
│       ├── test_photos.py
│       └── test_likes.py
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── manage.py
└── pytest.ini
```

#### 3.3 API Design

**Authentication Endpoints:**
```python
POST /api/auth/token/          # Sign in (get JWT)
POST /api/auth/token/refresh/  # Refresh JWT
POST /api/auth/logout/         # Sign out
GET  /api/auth/user/           # Get current user
```

**Photo Endpoints:**
```python
GET  /api/photos/              # List photos (paginated)
GET  /api/photos/{id}/         # Get photo details
POST /api/photos/{id}/like/    # Like/unlike photo
GET  /api/photos/{id}/likes/   # Get photo likes
```

**API Response Format:**
```json
{
  "success": true,
  "data": {
    "count": 50,
    "next": "http://api.example.com/photos/?page=2",
    "previous": null,
    "results": [...]
  },
  "message": "Success"
}
```

### 4. Database Architecture

#### 4.1 Database Design (Supabase/PostgreSQL)

**Entity Relationship Diagram:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     users       │    │     photos      │    │     likes       │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │    │ id (PK)         │    │ id (PK)         │
│ email           │    │ pexels_id       │    │ user_id (FK)    │
│ password_hash   │    │ width           │    │ photo_id (FK)   │
│ first_name      │    │ height          │    │ created_at      │
│ last_name       │    │ url             │    └─────────────────┘
│ created_at      │    │ photographer    │            │
│ updated_at      │    │ photographer_url│            │
│ is_active       │    │ avg_color       │            │
└─────────────────┘    │ src_original    │            │
         │              │ src_large       │            │
         │              │ src_medium      │            │
         │              │ src_small       │            │
         │              │ alt_text        │            │
         │              │ created_at      │            │
         │              │ updated_at      │            │
         │              └─────────────────┘            │
         │                       │                     │
         └───────────────────────┴─────────────────────┘
```

#### 4.2 Database Schema

**Users Table:**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
```

**Photos Table:**
```sql
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pexels_id INTEGER UNIQUE NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    url TEXT NOT NULL,
    photographer VARCHAR(255) NOT NULL,
    photographer_url TEXT,
    photographer_id INTEGER,
    avg_color VARCHAR(7),
    src_original TEXT NOT NULL,
    src_large TEXT,
    src_medium TEXT,
    src_small TEXT,
    alt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photos_pexels_id ON photos(pexels_id);
CREATE INDEX idx_photos_photographer ON photos(photographer);
CREATE INDEX idx_photos_created_at ON photos(created_at);
```

**Likes Table:**
```sql
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    photo_id UUID NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, photo_id)
);

CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_photo_id ON likes(photo_id);
CREATE INDEX idx_likes_created_at ON likes(created_at);
```

### 5. Security Architecture

#### 5.1 Authentication & Authorization
- **JWT Tokens:** Stateless authentication with access/refresh tokens
- **Password Security:** bcrypt hashing with salt rounds
- **Token Expiration:** Access tokens (15 min), Refresh tokens (7 days)
- **CSRF Protection:** Built-in Django CSRF middleware
- **Rate Limiting:** API endpoint throttling

#### 5.2 API Security
```python
# Django settings for security
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Development
    "https://yourdomain.com"  # Production
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    }
}
```

#### 5.3 Input Validation
- **Serializer Validation:** DRF serializers with custom validators
- **SQL Injection Prevention:** Django ORM parameterized queries
- **XSS Protection:** Built-in Django template escaping
- **File Upload Security:** Restricted file types and sizes

### 6. Performance Architecture

#### 6.1 Frontend Optimization
- **Image Optimization:** Next.js Image component with lazy loading
- **Code Splitting:** Automatic route-based code splitting
- **Caching:** Browser caching for static assets
- **Compression:** Gzip compression for responses

#### 6.2 Backend Optimization
- **Database Indexing:** Strategic indexes on frequently queried columns
- **Query Optimization:** Select related and prefetch related
- **Pagination:** Efficient offset-based pagination
- **Caching:** Redis cache for frequently accessed data

#### 6.3 Performance Monitoring
```python
# Django performance monitoring
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'OPTIONS': {
            'MAX_CONNS': 20,
            'CONN_MAX_AGE': 60,
        }
    }
}

# Query optimization
def get_photos_with_likes(user_id, page=1):
    return Photo.objects.select_related('photographer').prefetch_related(
        Prefetch('likes', queryset=Like.objects.filter(user_id=user_id))
    ).annotate(
        like_count=Count('likes'),
        user_liked=Exists(Like.objects.filter(user_id=user_id, photo_id=OuterRef('id')))
    )
```

### 7. Deployment Architecture

#### 7.1 Development Environment
- **Frontend:** Next.js dev server (localhost:3000)
- **Backend:** Django runserver (localhost:8000)
- **Database:** Supabase development project
- **Hot Reload:** Both frontend and backend with auto-restart

#### 7.2 Production Architecture
```
Internet → Load Balancer → Frontend (Next.js) → Backend (Django) → Database (Supabase)
                              ↓
                         Static Assets (CDN)
```

### 8. Integration Points

#### 8.1 Frontend-Backend Communication
- **API Client:** Custom fetch wrapper with authentication
- **Error Handling:** Centralized error handling and user feedback
- **Loading States:** UI indicators for async operations

#### 8.2 Database Integration
- **Supabase Client:** Django database configuration
- **Migrations:** Django migration system
- **Data Seeding:** Management command for CSV import

### 9. Testing Architecture

#### 9.1 Frontend Testing
- **Unit Tests:** Jest + React Testing Library
- **Integration Tests:** API integration tests
- **E2E Tests:** Cypress for user workflows

#### 9.2 Backend Testing
- **Unit Tests:** pytest for individual functions
- **Integration Tests:** Django TestCase for API endpoints
- **Database Tests:** Test database with fixtures

### 10. Monitoring and Logging

#### 10.1 Application Monitoring
- **Error Tracking:** Sentry integration
- **Performance Monitoring:** Response time tracking
- **User Analytics:** Basic usage metrics

#### 10.2 Logging Strategy
```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'app.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

### 11. Scalability Considerations

#### 11.1 Database Scaling
- **Read Replicas:** Supabase read replicas for read-heavy operations
- **Connection Pooling:** Efficient database connection management
- **Query Optimization:** Regular query performance analysis

#### 11.2 Application Scaling
- **Horizontal Scaling:** Multiple backend instances behind load balancer
- **Caching Strategy:** Redis for session storage and frequent queries
- **CDN Integration:** Static asset delivery optimization

### 12. Future Enhancements

#### 12.1 Technical Improvements
- **Real-time Updates:** WebSocket integration for live like counts
- **Search Functionality:** Full-text search for photos
- **Mobile App:** React Native or Flutter mobile application
- **Admin Dashboard:** Content management interface

#### 12.2 Infrastructure Upgrades
- **Kubernetes:** Container orchestration for production
- **CI/CD Pipeline:** Automated testing and deployment
- **Monitoring Dashboard:** Comprehensive application monitoring
- **Backup Strategy:** Automated database backups and disaster recovery