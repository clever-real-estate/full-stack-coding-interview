# Security, Scalability, and Performance Requirements
## Photo Gallery Web Application

### 1. Security Requirements

#### 1.1 Authentication and Authorization

**JWT Token Security:**
```python
# Django settings for JWT
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': settings.SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}
```

**Security Measures:**
- Short-lived access tokens (15 minutes)
- Refresh token rotation for enhanced security
- Blacklist invalidated tokens
- Secure token storage in httpOnly cookies for production
- JWT secret key rotation strategy

**Password Security:**
```python
# Django password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Custom password validator
class CustomPasswordValidator:
    def validate(self, password, user=None):
        if not any(char.isupper() for char in password):
            raise ValidationError("Password must contain at least one uppercase letter.")
        if not any(char.islower() for char in password):
            raise ValidationError("Password must contain at least one lowercase letter.")
        if not any(char.isdigit() for char in password):
            raise ValidationError("Password must contain at least one digit.")
```

#### 1.2 Input Validation and Sanitization

**Backend Input Validation:**
```python
# Serializer validation
class PhotoSerializer(serializers.ModelSerializer):
    alt_text = serializers.CharField(
        max_length=500,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9\s\-_.,!?]+$',
                message="Alt text contains invalid characters."
            )
        ]
    )
    
    def validate_pexels_id(self, value):
        if value <= 0:
            raise serializers.ValidationError("Pexels ID must be positive.")
        return value
    
    def validate_photographer(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Photographer name too short.")
        return value.strip()

# URL validation
class URLValidator:
    def __call__(self, value):
        if not value.startswith(('http://', 'https://')):
            raise ValidationError("URL must start with http:// or https://")
        if 'pexels.com' not in value:
            raise ValidationError("Only Pexels URLs are allowed")
```

**Frontend Input Sanitization:**
```typescript
// Input sanitization utility
import DOMPurify from 'dompurify';

export class InputSanitizer {
  static sanitizeText(input: string): string {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
  }
  
  static sanitizeEmail(email: string): string {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = this.sanitizeText(email).toLowerCase();
    return emailRegex.test(sanitized) ? sanitized : '';
  }
  
  static validatePassword(password: string): boolean {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
  }
}
```

#### 1.3 SQL Injection Prevention

**Django ORM Security:**
```python
# Safe query practices
class PhotoViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Photo.objects.all()
        
        # Safe filtering with Django ORM
        photographer = self.request.query_params.get('photographer')
        if photographer:
            queryset = queryset.filter(photographer__icontains=photographer)
        
        # Safe ordering
        ordering = self.request.query_params.get('ordering', '-created_at')
        allowed_orderings = ['created_at', '-created_at', 'photographer', '-photographer']
        if ordering in allowed_orderings:
            queryset = queryset.order_by(ordering)
        
        return queryset
    
    def perform_create(self, serializer):
        # Parameterized queries through ORM
        serializer.save()

# Raw queries (if needed) with parameterization
def get_photos_by_photographer(photographer_name):
    return Photo.objects.raw(
        "SELECT * FROM photos WHERE photographer = %s",
        [photographer_name]
    )
```

#### 1.4 XSS Protection

**Backend XSS Prevention:**
```python
# Django template escaping (auto-enabled)
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
            'autoescape': True,  # Enabled by default
        },
    },
]

# Content Security Policy
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com")
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'", "https://fonts.googleapis.com")
CSP_IMG_SRC = ("'self'", "https://images.pexels.com", "data:")
CSP_CONNECT_SRC = ("'self'", "https://api.pexels.com")
```

**Frontend XSS Prevention:**
```typescript
// React automatic escaping + additional sanitization
const PhotoCard: React.FC<{ photo: Photo }> = ({ photo }) => {
  const sanitizedAltText = useMemo(() => {
    return DOMPurify.sanitize(photo.alt_text);
  }, [photo.alt_text]);
  
  return (
    <div className="photo-card">
      <img 
        src={photo.src_medium} 
        alt={sanitizedAltText}
        onError={(e) => {
          e.currentTarget.src = '/placeholder.jpg';
        }}
      />
      <p>{sanitizedAltText}</p>
    </div>
  );
};
```

#### 1.5 CORS Configuration

**Backend CORS Setup:**
```python
# Django CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Development
    "https://yourdomain.com",  # Production
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

# Environment-specific configuration
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')
```

#### 1.6 Rate Limiting and Throttling

**Django Rate Limiting:**
```python
# Rate limiting configuration
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour',
        'login': '5/minute',
        'photo_like': '60/minute',
    }
}

# Custom throttling
class LoginRateThrottle(UserRateThrottle):
    scope = 'login'
    
    def get_cache_key(self, request, view):
        if request.user.is_authenticated:
            ident = request.user.pk
        else:
            ident = self.get_ident(request)
        return self.cache_format % {
            'scope': self.scope,
            'ident': ident
        }

# View-specific throttling
class PhotoViewSet(viewsets.ModelViewSet):
    throttle_classes = [UserRateThrottle]
    throttle_scope = 'photo_like'
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        # Like functionality with rate limiting
        pass
```

**Frontend Rate Limiting:**
```typescript
// Client-side rate limiting
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  canMakeRequest(key: string, maxRequests: number, timeWindow: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside time window
    const validRequests = requests.filter(time => now - time < timeWindow);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

// Usage in API calls
const rateLimiter = new RateLimiter();

export const likePhoto = async (photoId: string) => {
  if (!rateLimiter.canMakeRequest('like', 10, 60000)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  // Make API call
  return apiClient.post(`/photos/${photoId}/like/`);
};
```

### 2. Scalability Requirements

#### 2.1 Database Scalability

**Database Optimization:**
```python
# Optimized queries with select_related and prefetch_related
class PhotoViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Photo.objects.select_related().prefetch_related(
            Prefetch(
                'likes',
                queryset=Like.objects.select_related('user'),
                to_attr='photo_likes'
            )
        ).annotate(
            like_count=Count('likes'),
            user_liked=Case(
                When(likes__user=self.request.user, then=True),
                default=False,
                output_field=BooleanField()
            )
        )

# Database connection pooling
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
        'OPTIONS': {
            'MAX_CONNS': 20,
            'CONN_MAX_AGE': 60,
        }
    }
}
```

**Database Indexes:**
```sql
-- Performance indexes
CREATE INDEX CONCURRENTLY idx_photos_photographer_created ON photos(photographer, created_at);
CREATE INDEX CONCURRENTLY idx_photos_pexels_id_hash ON photos USING hash(pexels_id);
CREATE INDEX CONCURRENTLY idx_likes_user_photo ON likes(user_id, photo_id);
CREATE INDEX CONCURRENTLY idx_likes_photo_created ON likes(photo_id, created_at);

-- Partial indexes for active records
CREATE INDEX CONCURRENTLY idx_users_active_email ON users(email) WHERE is_active = true;

-- Composite indexes for common queries
CREATE INDEX CONCURRENTLY idx_photos_search ON photos USING gin(
    to_tsvector('english', photographer || ' ' || alt_text)
);
```

#### 2.2 Application Scalability

**Caching Strategy:**
```python
# Redis caching configuration
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SERIALIZER': 'django_redis.serializers.json.JSONSerializer',
        },
        'KEY_PREFIX': 'photo_gallery',
        'TIMEOUT': 300,  # 5 minutes default
    }
}

# Cache implementation
from django.core.cache import cache
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator

class PhotoViewSet(viewsets.ModelViewSet):
    @method_decorator(cache_page(60 * 5))  # Cache for 5 minutes
    def list(self, request, *args, **kwargs):
        cache_key = f"photos_page_{request.GET.get('page', 1)}"
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return Response(cached_data)
        
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, 300)  # Cache for 5 minutes
        return response
    
    def perform_create(self, serializer):
        serializer.save()
        # Invalidate related caches
        cache.delete_pattern("photos_page_*")
    
    def perform_update(self, serializer):
        serializer.save()
        # Invalidate specific cache
        cache.delete(f"photo_{serializer.instance.id}")
```

**Session Management:**
```python
# Session configuration for scalability
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'
SESSION_COOKIE_AGE = 86400  # 24 hours
SESSION_SAVE_EVERY_REQUEST = False
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
```

#### 2.3 Frontend Scalability

**Code Splitting and Lazy Loading:**
```typescript
// Route-based code splitting
import { lazy, Suspense } from 'react';

const PhotoGallery = lazy(() => import('./pages/PhotoGallery'));
const SignIn = lazy(() => import('./pages/SignIn'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/gallery" element={<PhotoGallery />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

// Component-level lazy loading
const LazyPhotoCard = lazy(() => import('./PhotoCard'));

// Image lazy loading with Intersection Observer
const LazyImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : '/placeholder.jpg'}
      alt={alt}
      loading="lazy"
    />
  );
};
```

**State Management Optimization:**
```typescript
// Optimized state management with React Context
interface PhotoState {
  photos: Photo[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const PhotoReducer = (state: PhotoState, action: PhotoAction): PhotoState => {
  switch (action.type) {
    case 'FETCH_PHOTOS_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_PHOTOS_SUCCESS':
      return {
        ...state,
        photos: action.payload.results,
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
        error: null
      };
    
    case 'UPDATE_PHOTO_LIKE':
      return {
        ...state,
        photos: state.photos.map(photo =>
          photo.id === action.payload.photoId
            ? { ...photo, ...action.payload.updates }
            : photo
        )
      };
    
    default:
      return state;
  }
};

// Memoized components for performance
const PhotoCard = React.memo(({ photo, onLike }: PhotoCardProps) => {
  return (
    <div className="photo-card">
      <LazyImage src={photo.src_medium} alt={photo.alt_text} />
      <LikeButton photo={photo} onLike={onLike} />
    </div>
  );
});
```

### 3. Performance Requirements

#### 3.1 Backend Performance

**API Response Time Optimization:**
```python
# Pagination for large datasets
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
    
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
            'page_size': self.page_size,
            'total_pages': self.page.paginator.num_pages
        })

# Query optimization
class PhotoViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        # Optimized query with minimal database hits
        return Photo.objects.select_related().prefetch_related(
            'likes__user'
        ).annotate(
            like_count=Count('likes', distinct=True),
            user_liked=Exists(
                Like.objects.filter(
                    user=self.request.user,
                    photo=OuterRef('pk')
                )
            )
        ).order_by('-created_at')
    
    def list(self, request, *args, **kwargs):
        # Add performance monitoring
        start_time = time.time()
        response = super().list(request, *args, **kwargs)
        
        # Log slow queries
        duration = time.time() - start_time
        if duration > 1.0:  # Log queries taking more than 1 second
            logger.warning(f"Slow query detected: {duration:.2f}s")
        
        return response
```

**Database Connection Management:**
```python
# Connection pooling with pgbouncer
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
        'OPTIONS': {
            'MAX_CONNS': 20,
            'CONN_MAX_AGE': 60,
            'OPTIONS': {
                'application_name': 'photo_gallery',
            }
        }
    }
}

# Query debugging in development
if DEBUG:
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
            },
        },
        'loggers': {
            'django.db.backends': {
                'handlers': ['console'],
                'level': 'DEBUG',
            },
        },
    }
```

#### 3.2 Frontend Performance

**Image Optimization:**
```typescript
// Next.js Image component optimization
const OptimizedImage: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        onLoad={() => setIsLoading(false)}
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`duration-700 ease-in-out ${
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
        }`}
      />
    </div>
  );
};

// Progressive image loading
const ProgressiveImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(src.replace('medium', 'small'));
  
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    img.src = src;
  }, [src]);
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        imageLoaded ? 'opacity-100' : 'opacity-70'
      }`}
    />
  );
};
```

**Bundle Optimization:**
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 1 week
  },
  
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Webpack optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

#### 3.3 Performance Monitoring

**Backend Monitoring:**
```python
# Performance monitoring middleware
class PerformanceMonitoringMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        start_time = time.time()
        
        response = self.get_response(request)
        
        duration = time.time() - start_time
        
        # Log slow requests
        if duration > 2.0:
            logger.warning(
                f"Slow request: {request.method} {request.path} "
                f"took {duration:.2f}s"
            )
        
        # Add performance headers
        response['X-Response-Time'] = f"{duration:.3f}s"
        
        return response

# Database query monitoring
class QueryCountDebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        queries_before = len(connection.queries)
        
        response = self.get_response(request)
        
        queries_after = len(connection.queries)
        query_count = queries_after - queries_before
        
        if query_count > 10:
            logger.warning(f"High query count: {query_count} queries")
        
        response['X-Query-Count'] = str(query_count)
        return response
```

**Frontend Monitoring:**
```typescript
// Performance monitoring hooks
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          console.log('Navigation timing:', entry);
        }
        
        if (entry.entryType === 'paint') {
          console.log('Paint timing:', entry);
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation', 'paint'] });
    
    return () => observer.disconnect();
  }, []);
};

// API performance monitoring
const useApiPerformance = () => {
  const [metrics, setMetrics] = useState<ApiMetrics>({
    averageResponseTime: 0,
    totalRequests: 0,
    errorRate: 0,
  });
  
  const trackApiCall = useCallback((duration: number, success: boolean) => {
    setMetrics(prev => ({
      averageResponseTime: 
        (prev.averageResponseTime * prev.totalRequests + duration) / 
        (prev.totalRequests + 1),
      totalRequests: prev.totalRequests + 1,
      errorRate: success 
        ? prev.errorRate 
        : (prev.errorRate * prev.totalRequests + 1) / (prev.totalRequests + 1),
    }));
  }, []);
  
  return { metrics, trackApiCall };
};
```

### 4. Scalability Improvements

#### 4.1 Database Scaling Strategies

**Read Replicas:**
```python
# Database routing for read replicas
class DatabaseRouter:
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'photos':
            return 'photos_read'
        return 'default'
    
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'photos':
            return 'photos_write'
        return 'default'

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'photo_gallery',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
    },
    'photos_read': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'photo_gallery',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'read-replica-host',
        'PORT': '5432',
    },
    'photos_write': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'photo_gallery',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'write-host',
        'PORT': '5432',
    }
}

DATABASE_ROUTERS = ['myapp.routers.DatabaseRouter']
```

**Horizontal Scaling:**
```python
# Sharding strategy for large datasets
class ShardedPhotoManager(models.Manager):
    def get_shard(self, photo_id):
        # Simple hash-based sharding
        shard_id = hash(photo_id) % 4
        return f'photos_shard_{shard_id}'
    
    def create_photo(self, **kwargs):
        photo = self.model(**kwargs)
        shard = self.get_shard(photo.id)
        photo.save(using=shard)
        return photo

# Load balancing configuration
LOAD_BALANCER_CONFIG = {
    'backend_servers': [
        {'host': 'server1.example.com', 'port': 8000, 'weight': 1},
        {'host': 'server2.example.com', 'port': 8000, 'weight': 1},
        {'host': 'server3.example.com', 'port': 8000, 'weight': 2},
    ],
    'health_check_url': '/health/',
    'session_affinity': False,
}
```

#### 4.2 CDN and Asset Optimization

**CDN Configuration:**
```python
# Django CDN settings
STATIC_URL = 'https://cdn.example.com/static/'
MEDIA_URL = 'https://cdn.example.com/media/'

# Static file optimization
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Image optimization
THUMBNAIL_BACKEND = 'sorl.thumbnail.backends.wand_backend.WandBackend'
THUMBNAIL_ENGINE = 'sorl.thumbnail.engines.wand_engine.WandEngine'
THUMBNAIL_FORMAT = 'WebP'
THUMBNAIL_QUALITY = 85
```

**Frontend CDN Integration:**
```typescript
// CDN URL configuration
const CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_URL || '';

export const getOptimizedImageUrl = (
  originalUrl: string,
  width: number,
  height: number,
  quality: number = 85
): string => {
  if (CDN_BASE_URL) {
    return `${CDN_BASE_URL}/img/${encodeURIComponent(originalUrl)}?w=${width}&h=${height}&q=${quality}`;
  }
  return originalUrl;
};

// Service Worker for asset caching
const CACHE_NAME = 'photo-gallery-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/images/placeholder.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
```

### 5. Future Scalability Considerations

#### 5.1 Microservices Architecture

**Service Decomposition:**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Auth Service   │    │  Photo Service  │    │  Like Service   │
│                 │    │                 │    │                 │
│ - User auth     │    │ - Photo CRUD    │    │ - Like/Unlike   │
│ - JWT tokens    │    │ - Photo search  │    │ - Like counts   │
│ - User profiles │    │ - Photo metadata│    │ - User likes    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                  ┌─────────────────┐
                  │  API Gateway    │
                  │                 │
                  │ - Route requests│
                  │ - Load balancing│
                  │ - Rate limiting │
                  │ - Authentication│
                  └─────────────────┘
```

#### 5.2 Event-Driven Architecture

**Event Processing:**
```python
# Event-driven like processing
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
import json
from django.core.cache import cache

@receiver(post_save, sender=Like)
def handle_like_created(sender, instance, created, **kwargs):
    if created:
        # Update photo like count in cache
        cache_key = f"photo_likes_{instance.photo.id}"
        cache.delete(cache_key)
        
        # Publish event for real-time updates
        event_data = {
            'type': 'like_created',
            'photo_id': str(instance.photo.id),
            'user_id': str(instance.user.id),
            'timestamp': instance.created_at.isoformat()
        }
        
        # Publish to message queue (Redis/RabbitMQ)
        publish_event('photo_likes', event_data)

@receiver(post_delete, sender=Like)
def handle_like_deleted(sender, instance, **kwargs):
    # Update photo like count in cache
    cache_key = f"photo_likes_{instance.photo.id}"
    cache.delete(cache_key)
    
    # Publish event for real-time updates
    event_data = {
        'type': 'like_deleted',
        'photo_id': str(instance.photo.id),
        'user_id': str(instance.user.id),
        'timestamp': timezone.now().isoformat()
    }
    
    publish_event('photo_likes', event_data)
```

#### 5.3 Real-time Features

**WebSocket Integration:**
```python
# Django Channels for real-time updates
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class PhotoLikesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.photo_id = self.scope['url_route']['kwargs']['photo_id']
        self.room_group_name = f'photo_likes_{self.photo_id}'
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def photo_like_update(self, event):
        await self.send(text_data=json.dumps({
            'type': 'like_update',
            'like_count': event['like_count'],
            'user_liked': event['user_liked']
        }))
```

This comprehensive security, scalability, and performance documentation provides a robust foundation for building a production-ready photo gallery application that can handle growth and maintain security standards.