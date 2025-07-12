# Photo Gallery Backend

A Django REST Framework backend for the Photo Gallery application providing authentication, photo management, and like functionality.

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Import photo data:**
   ```bash
   python manage.py import_photos
   ```

7. **Start development server:**
   ```bash
   python manage.py runserver 8000
   ```

The API will be available at `http://localhost:8000/api/`

## 📁 Project Structure

```
backend/
├── photo_gallery_backend/          # Django project settings
│   ├── settings.py                # Django configuration
│   ├── urls.py                    # Main URL routing
│   ├── wsgi.py                    # WSGI application
│   └── asgi.py                    # ASGI application
├── photos/                        # Django app
│   ├── models.py                  # Photo and Like models
│   ├── views.py                   # API views and endpoints
│   ├── serializers.py             # DRF serializers
│   ├── urls.py                    # App URL routing
│   ├── admin.py                   # Django admin configuration
│   ├── apps.py                    # App configuration
│   ├── middleware.py              # Custom middleware
│   ├── tests.py                   # Test suite
│   └── management/
│       └── commands/
│           └── import_photos.py   # Custom management command
├── manage.py                      # Django management script
├── db.sqlite3                     # SQLite database
├── requirements.txt               # Python dependencies
└── README.md                     # This file
```

## 🔧 Configuration

### Environment Variables
The application uses the following default settings (configured in `settings.py`):

- **SECRET_KEY**: `django-insecure-your-secret-key-here`
- **DEBUG**: `True` (development mode)
- **DATABASE**: SQLite (`db.sqlite3`)
- **CORS_ALLOWED_ORIGINS**: `http://localhost:3000`, `http://127.0.0.1:3000`

### Database
- **Engine**: SQLite3 (default)
- **File**: `db.sqlite3` (auto-created)

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login/`
User login endpoint.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

#### POST `/api/auth/logout/`
User logout endpoint.

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

#### GET `/api/auth/user/`
Get current authenticated user.

**Response (200):**
```json
{
  "id": 1,
  "username": "admin"
}
```

**Response (401):**
```json
{
  "error": "Not authenticated"
}
```

### Photo Endpoints

#### GET `/api/photos/`
Get all photos (requires authentication).

**Response (200):**
```json
[
  {
    "id": 1,
    "width": 1920,
    "height": 1080,
    "url": "https://example.com/photo",
    "photographer": "John Doe",
    "photographer_url": "https://example.com/john",
    "photographer_id": 123,
    "avg_color": "#FF5733",
    "src_original": "https://example.com/original.jpg",
    "src_large2x": "https://example.com/large2x.jpg",
    "src_large": "https://example.com/large.jpg",
    "src_medium": "https://example.com/medium.jpg",
    "src_small": "https://example.com/small.jpg",
    "src_portrait": "https://example.com/portrait.jpg",
    "src_landscape": "https://example.com/landscape.jpg",
    "src_tiny": "https://example.com/tiny.jpg",
    "alt": "Beautiful landscape",
    "is_liked": false
  }
]
```

### Like Endpoints

#### POST `/api/photos/{photo_id}/like/`
Like a photo (requires authentication).

**Response (201):**
```json
{
  "message": "Photo liked"
}
```

**Response (200):**
```json
{
  "message": "Photo already liked"
}
```

#### DELETE `/api/photos/{photo_id}/like/`
Unlike a photo (requires authentication).

**Response (200):**
```json
{
  "message": "Like removed"
}
```

## 🗄️ Database Models

### Photo Model
```python
class Photo(models.Model):
    width = models.IntegerField()
    height = models.IntegerField()
    url = models.URLField()
    photographer = models.CharField(max_length=255)
    photographer_url = models.URLField()
    photographer_id = models.IntegerField()
    avg_color = models.CharField(max_length=7)
    src_original = models.URLField()
    src_large2x = models.URLField()
    src_large = models.URLField()
    src_medium = models.URLField()
    src_small = models.URLField()
    src_portrait = models.URLField()
    src_landscape = models.URLField()
    src_tiny = models.URLField()
    alt = models.TextField()
```

### Like Model
```python
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'photo')
```

## 🧪 Testing

### Run All Tests
```bash
python manage.py test
```

### Test Coverage
The test suite covers:
- ✅ Model creation and validation
- ✅ API endpoint functionality
- ✅ Authentication flows
- ✅ Like/unlike operations
- ✅ Error handling

### Test Structure
- `PhotoModelTest`: Tests Photo model functionality
- `LikeModelTest`: Tests Like model functionality
- `PhotoAPITest`: Tests photo-related API endpoints
- `AuthAPITest`: Tests authentication API endpoints

## 🔧 Development Commands

### Database Operations
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Reset database
rm db.sqlite3
python manage.py migrate
python manage.py import_photos
```

### Management Commands
```bash
# Import photos from CSV
python manage.py import_photos

# Create superuser
python manage.py createsuperuser

# Shell access
python manage.py shell
```

### Django Admin
```bash
# Start server
python manage.py runserver 8000

# Access admin at: http://localhost:8000/admin/
```

## 🔒 Security

### Authentication
- Session-based authentication
- CSRF protection disabled for API endpoints
- CORS configured for frontend communication

### CORS Configuration
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True
```

## 🚀 Deployment

### Production Settings
For production deployment, update `settings.py`:

```python
DEBUG = False
SECRET_KEY = 'your-secure-secret-key'
ALLOWED_HOSTS = ['your-domain.com']
```

### Environment Variables
Consider using environment variables for sensitive settings:

```python
import os

SECRET_KEY = os.environ.get('SECRET_KEY', 'default-key')
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
```

## 📦 Dependencies

### Core Dependencies
- `Django==4.2.23` - Web framework
- `djangorestframework==3.16.0` - API framework
- `django-cors-headers==4.7.0` - CORS handling

### Development Dependencies
- `pytest` - Testing framework (optional)
- `pytest-django` - Django test integration (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📝 License

This project is part of Clever's Fullstack Coding Interview.

## 🆘 Troubleshooting

### Common Issues

**Database errors:**
```bash
python manage.py migrate --run-syncdb
```

**Import errors:**
```bash
pip install -r requirements.txt
```

**CORS issues:**
- Ensure frontend is running on `http://localhost:3000`
- Check CORS settings in `settings.py`

**Authentication issues:**
- Verify session cookies are enabled
- Check CSRF settings for API endpoints 