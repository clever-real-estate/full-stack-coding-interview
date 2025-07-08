# API Specification and Data Models
## Photo Gallery Web Application

### 1. API Overview

The Photo Gallery API follows REST architectural principles with JSON data exchange. All endpoints except authentication require JWT token authentication. The API supports pagination, filtering, and proper HTTP status codes.

**Base URL:** `http://localhost:8000/api/`  
**Authentication:** JWT Bearer Token  
**Content Type:** `application/json`

### 2. Authentication Endpoints

#### 2.1 User Sign In
**Endpoint:** `POST /auth/token/`  
**Description:** Authenticate user and receive JWT tokens

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "date_joined": "2024-01-15T10:30:00Z"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "detail": "Invalid credentials"
}
```

#### 2.2 Token Refresh
**Endpoint:** `POST /auth/token/refresh/`  
**Description:** Refresh access token using refresh token

**Request:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

#### 2.3 User Sign Out
**Endpoint:** `POST /auth/logout/`  
**Description:** Invalidate refresh token  
**Authentication:** Required

**Request:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

#### 2.4 Get Current User
**Endpoint:** `GET /auth/user/`  
**Description:** Get current authenticated user information  
**Authentication:** Required

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "date_joined": "2024-01-15T10:30:00Z"
}
```

### 3. Photo Endpoints

#### 3.1 List Photos
**Endpoint:** `GET /photos/`  
**Description:** Get paginated list of photos with like information  
**Authentication:** Required

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `page_size` (integer, optional): Photos per page (default: 10, max: 50)
- `photographer` (string, optional): Filter by photographer name
- `search` (string, optional): Search in alt text and photographer

**Response (200 OK):**
```json
{
  "count": 150,
  "next": "http://localhost:8000/api/photos/?page=2",
  "previous": null,
  "results": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "pexels_id": 21751820,
      "width": 3888,
      "height": 5184,
      "url": "https://www.pexels.com/photo/a-small-island-surrounded-by-trees-in-the-middle-of-a-lake-21751820/",
      "photographer": "Felix",
      "photographer_url": "https://www.pexels.com/@felix-57767809",
      "photographer_id": 57767809,
      "avg_color": "#333831",
      "src_original": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg",
      "src_large": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "src_medium": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=350",
      "src_small": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=130",
      "alt_text": "A small island surrounded by trees in the middle of a lake",
      "like_count": 24,
      "user_liked": false,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### 3.2 Get Photo Details
**Endpoint:** `GET /photos/{photo_id}/`  
**Description:** Get detailed information about a specific photo  
**Authentication:** Required

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "pexels_id": 21751820,
  "width": 3888,
  "height": 5184,
  "url": "https://www.pexels.com/photo/a-small-island-surrounded-by-trees-in-the-middle-of-a-lake-21751820/",
  "photographer": "Felix",
  "photographer_url": "https://www.pexels.com/@felix-57767809",
  "photographer_id": 57767809,
  "avg_color": "#333831",
  "src_original": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg",
  "src_large": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  "src_medium": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=350",
  "src_small": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=130",
  "alt_text": "A small island surrounded by trees in the middle of a lake",
  "like_count": 24,
  "user_liked": false,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Response (404 Not Found):**
```json
{
  "detail": "Photo not found"
}
```

#### 3.3 Like/Unlike Photo
**Endpoint:** `POST /photos/{photo_id}/like/`  
**Description:** Toggle like status for a photo  
**Authentication:** Required

**Response (200 OK) - Photo Liked:**
```json
{
  "message": "Photo liked successfully",
  "liked": true,
  "like_count": 25
}
```

**Response (200 OK) - Photo Unliked:**
```json
{
  "message": "Photo unliked successfully",
  "liked": false,
  "like_count": 24
}
```

**Response (404 Not Found):**
```json
{
  "detail": "Photo not found"
}
```

#### 3.4 Get Photo Likes
**Endpoint:** `GET /photos/{photo_id}/likes/`  
**Description:** Get list of users who liked a photo  
**Authentication:** Required

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `page_size` (integer, optional): Likes per page (default: 20, max: 100)

**Response (200 OK):**
```json
{
  "count": 25,
  "next": "http://localhost:8000/api/photos/123e4567-e89b-12d3-a456-426614174000/likes/?page=2",
  "previous": null,
  "results": [
    {
      "id": "456e7890-f12b-34d5-c678-901234567890",
      "user": {
        "id": "789e0123-4567-89ab-cdef-012345678901",
        "email": "user@example.com",
        "first_name": "John",
        "last_name": "Doe"
      },
      "created_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### 4. User Endpoints

#### 4.1 User Registration
**Endpoint:** `POST /auth/register/`  
**Description:** Register a new user account

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword123",
  "first_name": "Jane",
  "last_name": "Smith"
}
```

**Response (201 Created):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "newuser@example.com",
  "first_name": "Jane",
  "last_name": "Smith",
  "date_joined": "2024-01-15T10:30:00Z"
}
```

**Response (400 Bad Request):**
```json
{
  "email": ["User with this email already exists."],
  "password": ["Password must be at least 8 characters long."]
}
```

#### 4.2 Get User Profile
**Endpoint:** `GET /users/{user_id}/`  
**Description:** Get user profile information  
**Authentication:** Required

**Response (200 OK):**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "date_joined": "2024-01-15T10:30:00Z",
  "total_likes": 42
}
```

#### 4.3 Get User Liked Photos
**Endpoint:** `GET /users/{user_id}/likes/`  
**Description:** Get photos liked by a specific user  
**Authentication:** Required (can only view own likes)

**Query Parameters:**
- `page` (integer, optional): Page number (default: 1)
- `page_size` (integer, optional): Photos per page (default: 10, max: 50)

**Response (200 OK):**
```json
{
  "count": 42,
  "next": "http://localhost:8000/api/users/123e4567-e89b-12d3-a456-426614174000/likes/?page=2",
  "previous": null,
  "results": [
    {
      "id": "456e7890-f12b-34d5-c678-901234567890",
      "photo": {
        "id": "789e0123-4567-89ab-cdef-012345678901",
        "pexels_id": 21751820,
        "photographer": "Felix",
        "src_medium": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=350",
        "alt_text": "A small island surrounded by trees in the middle of a lake",
        "like_count": 24
      },
      "created_at": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### 5. Data Models

#### 5.1 User Model
```python
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
```

**Database Schema:**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_staff BOOLEAN DEFAULT FALSE,
    is_superuser BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);
```

#### 5.2 Photo Model
```python
class Photo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pexels_id = models.IntegerField(unique=True)
    width = models.IntegerField()
    height = models.IntegerField()
    url = models.URLField(max_length=500)
    photographer = models.CharField(max_length=255)
    photographer_url = models.URLField(max_length=500, blank=True)
    photographer_id = models.IntegerField(blank=True, null=True)
    avg_color = models.CharField(max_length=7, blank=True)
    src_original = models.URLField(max_length=500)
    src_large = models.URLField(max_length=500, blank=True)
    src_medium = models.URLField(max_length=500, blank=True)
    src_small = models.URLField(max_length=500, blank=True)
    alt_text = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['pexels_id']),
            models.Index(fields=['photographer']),
            models.Index(fields=['created_at']),
        ]
```

**Database Schema:**
```sql
CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pexels_id INTEGER UNIQUE NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    url VARCHAR(500) NOT NULL,
    photographer VARCHAR(255) NOT NULL,
    photographer_url VARCHAR(500),
    photographer_id INTEGER,
    avg_color VARCHAR(7),
    src_original VARCHAR(500) NOT NULL,
    src_large VARCHAR(500),
    src_medium VARCHAR(500),
    src_small VARCHAR(500),
    alt_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_photos_pexels_id ON photos(pexels_id);
CREATE INDEX idx_photos_photographer ON photos(photographer);
CREATE INDEX idx_photos_created_at ON photos(created_at);
CREATE INDEX idx_photos_photographer_id ON photos(photographer_id);
```

#### 5.3 Like Model
```python
class Like(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name='likes')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ('user', 'photo')
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['photo']),
            models.Index(fields=['created_at']),
        ]
```

**Database Schema:**
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

### 6. API Serializers

#### 6.1 User Serializers
```python
class UserSerializer(serializers.ModelSerializer):
    total_likes = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'date_joined', 'total_likes']
        read_only_fields = ['id', 'date_joined', 'total_likes']
    
    def get_total_likes(self, obj):
        return obj.likes.count()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'first_name', 'last_name']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
```

#### 6.2 Photo Serializers
```python
class PhotoSerializer(serializers.ModelSerializer):
    like_count = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    
    class Meta:
        model = Photo
        fields = [
            'id', 'pexels_id', 'width', 'height', 'url', 'photographer',
            'photographer_url', 'photographer_id', 'avg_color', 'src_original',
            'src_large', 'src_medium', 'src_small', 'alt_text', 'like_count',
            'user_liked', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'like_count', 'user_liked']
    
    def get_like_count(self, obj):
        return obj.likes.count()
    
    def get_user_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

class PhotoDetailSerializer(PhotoSerializer):
    photographer_info = serializers.SerializerMethodField()
    
    class Meta(PhotoSerializer.Meta):
        fields = PhotoSerializer.Meta.fields + ['photographer_info']
    
    def get_photographer_info(self, obj):
        return {
            'name': obj.photographer,
            'url': obj.photographer_url,
            'pexels_id': obj.photographer_id
        }
```

#### 6.3 Like Serializers
```python
class LikeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = ['id', 'user', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class UserLikeSerializer(serializers.ModelSerializer):
    photo = PhotoSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = ['id', 'photo', 'created_at']
        read_only_fields = ['id', 'photo', 'created_at']
```

### 7. Error Handling

#### 7.1 Standard Error Responses
All API endpoints return consistent error responses with appropriate HTTP status codes.

**400 Bad Request:**
```json
{
  "detail": "Invalid input data",
  "errors": {
    "email": ["This field is required."],
    "password": ["Password must be at least 8 characters long."]
  }
}
```

**401 Unauthorized:**
```json
{
  "detail": "Authentication credentials were not provided."
}
```

**403 Forbidden:**
```json
{
  "detail": "You do not have permission to perform this action."
}
```

**404 Not Found:**
```json
{
  "detail": "Not found."
}
```

**429 Too Many Requests:**
```json
{
  "detail": "Request was throttled. Expected available in 60 seconds."
}
```

**500 Internal Server Error:**
```json
{
  "detail": "A server error occurred. Please try again later."
}
```

### 8. Rate Limiting

#### 8.1 Rate Limit Configuration
```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
        'login': '5/minute'
    }
}
```

#### 8.2 Rate Limit Headers
API responses include rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642694400
```

### 9. Pagination

#### 9.1 Pagination Configuration
```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
```

#### 9.2 Pagination Response Format
```json
{
  "count": 150,
  "next": "http://localhost:8000/api/photos/?page=3",
  "previous": "http://localhost:8000/api/photos/?page=1",
  "results": [...]
}
```

### 10. API Documentation

#### 10.1 OpenAPI/Swagger Integration
```python
# settings.py
SPECTACULAR_SETTINGS = {
    'TITLE': 'Photo Gallery API',
    'DESCRIPTION': 'A RESTful API for photo gallery management',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
    'SWAGGER_UI_SETTINGS': {
        'deepLinking': True,
        'persistAuthorization': True,
        'displayOperationId': True,
    },
    'PREPROCESSING_HOOKS': [
        'spectacular.hooks.preprocess_exclude_path_format',
    ],
    'POSTPROCESSING_HOOKS': [
        'spectacular.hooks.postprocess_schema_enums',
    ],
}

# urls.py
urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
```

### 11. TypeScript Types

#### 11.1 Frontend Type Definitions
```typescript
// types/auth.ts
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  total_likes?: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

// types/photo.ts
export interface Photo {
  id: string;
  pexels_id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src_original: string;
  src_large: string;
  src_medium: string;
  src_small: string;
  alt_text: string;
  like_count: number;
  user_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface PhotosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Photo[];
}

export interface LikeResponse {
  message: string;
  liked: boolean;
  like_count: number;
}

// types/api.ts
export interface ApiResponse<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
  data?: T;
}

export interface ApiError {
  detail: string;
  errors?: Record<string, string[]>;
}
```

### 12. Testing Examples

#### 12.1 API Testing with pytest
```python
# tests/test_photos.py
import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from apps.photos.models import Photo, Like

User = get_user_model()

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def user():
    return User.objects.create_user(
        email='test@example.com',
        password='testpass123',
        first_name='Test',
        last_name='User'
    )

@pytest.fixture
def photo():
    return Photo.objects.create(
        pexels_id=12345,
        width=1920,
        height=1080,
        url='https://example.com/photo.jpg',
        photographer='Test Photographer',
        src_original='https://example.com/photo.jpg',
        alt_text='Test photo'
    )

def test_photo_list_requires_authentication(api_client):
    url = reverse('photo-list')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

def test_photo_list_authenticated(api_client, user):
    api_client.force_authenticate(user=user)
    url = reverse('photo-list')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert 'results' in response.data

def test_photo_like_functionality(api_client, user, photo):
    api_client.force_authenticate(user=user)
    url = reverse('photo-like', kwargs={'pk': photo.id})
    
    # Like photo
    response = api_client.post(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['liked'] is True
    assert response.data['like_count'] == 1
    
    # Unlike photo
    response = api_client.post(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data['liked'] is False
    assert response.data['like_count'] == 0
```

#### 12.2 Frontend API Testing
```typescript
// __tests__/api/photos.test.ts
import { PhotosAPI } from '../../utils/api';
import { Photo, PhotosResponse } from '../../types/photo';

describe('PhotosAPI', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('getPhotos', () => {
    it('should fetch photos successfully', async () => {
      const mockResponse: PhotosResponse = {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            id: '123',
            pexels_id: 12345,
            photographer: 'Test Photographer',
            alt_text: 'Test photo',
            like_count: 0,
            user_liked: false,
            // ... other fields
          }
        ]
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const result = await PhotosAPI.getPhotos(1);
      
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:8000/api/photos/?page=1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-token'
          })
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle authentication error', async () => {
      fetchMock.mockRejectOnce(new Error('401 Unauthorized'));

      await expect(PhotosAPI.getPhotos(1)).rejects.toThrow('401 Unauthorized');
    });
  });

  describe('likePhoto', () => {
    it('should like photo successfully', async () => {
      const mockResponse = {
        message: 'Photo liked successfully',
        liked: true,
        like_count: 1
      };

      fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

      const result = await PhotosAPI.likePhoto('123');
      
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:8000/api/photos/123/like/',
        expect.objectContaining({
          method: 'POST'
        })
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
```

This comprehensive API specification provides a complete reference for implementing the Photo Gallery Web Application's backend and frontend integration. The documentation includes detailed endpoint specifications, data models, error handling, and testing examples to ensure a robust and maintainable implementation.