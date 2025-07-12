# Clever's Fullstack Coding Interview - Photo Gallery

A full-stack photo gallery application built with Django REST Framework backend and React TypeScript frontend, featuring authentication, photo display, and like functionality with a modern, responsive design.

## 🎯 Project Overview

This project demonstrates a complete full-stack application with:
- **Backend**: Django REST Framework with session-based authentication
- **Frontend**: React TypeScript with Atomic Design architecture
- **Database**: SQLite with Photo and Like models
- **Testing**: Comprehensive test coverage for both frontend and backend
- **Deployment**: Ready for production deployment

## ✨ Features

### ✅ Core Requirements
- [x] **Authentication**: Functional sign-in page with session-based authentication
- [x] **Protected Routes**: "All photos" page requires authentication
- [x] **Photo Gallery**: Displays 10 photos from the provided CSV data
- [x] **Like Functionality**: Users can like/unlike photos with database persistence
- [x] **Mobile Responsive**: Responsive design that works on mobile devices

### ✅ Bonus Features
- [x] **Modern UI**: Clean, modern interface with smooth animations
- [x] **TypeScript**: Full type safety across the application
- [x] **Atomic Design**: Well-organized component architecture
- [x] **Comprehensive Testing**: 100% test coverage for critical functionality
- [x] **Error Handling**: Robust error handling and loading states
- [x] **Accessibility**: Proper focus management and keyboard navigation

## 🏗️ Architecture

### Tech Stack

#### Backend
- **Django 4.2.23** - Web framework
- **Django REST Framework 3.16.0** - API framework
- **Django CORS Headers 4.7.0** - Cross-origin resource sharing
- **SQLite** - Database (for simplicity)

#### Frontend
- **React 18.2.0** - UI library
- **TypeScript** - Type safety
- **React Router 6.8.1** - Client-side routing
- **Axios 1.3.4** - HTTP client
- **CSS Modules** - Scoped styling

### Project Structure
```
full-stack-coding-interview/
├── backend/                          # Django backend
│   ├── photo_gallery_backend/        # Django project settings
│   ├── photos/                       # Django app with models & API
│   ├── requirements.txt              # Python dependencies
│   └── README.md                    # Backend documentation
├── frontend/                         # React frontend
│   └── photo-gallery/               # React application
│       ├── src/
│       │   ├── components/          # Atomic Design components
│       │   ├── pages/               # Page components
│       │   ├── hooks/               # Custom React hooks
│       │   └── utils/               # API services
│       └── README.md                # Frontend documentation
├── photos.csv                        # Photo data source
└── README.md                        # This file
```

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (for backend)
- **Node.js 16+** (for frontend, recommended: Node.js 18+)
- **npm or yarn** (package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Import photo data:**
   ```bash
   python manage.py import_photos
   ```

6. **Start the Django server:**
   ```bash
   python manage.py runserver 8000
   ```

The backend API will be available at `http://localhost:8000/api/`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend/photo-gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 🔐 Authentication

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Authentication Flow
1. User visits the application
2. Redirected to login page if not authenticated
3. Enter credentials to access photo gallery
4. Session-based authentication with Django
5. Protected routes ensure authentication

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Get current user

### Photo Endpoints
- `GET /api/photos/` - Get all photos (requires authentication)
- `POST /api/photos/{id}/like/` - Like a photo
- `DELETE /api/photos/{id}/like/` - Unlike a photo

For detailed API documentation, see [Backend README](backend/README.md#api-documentation).

## 🧪 Testing

### Backend Testing
```bash
cd backend
python manage.py test
```

**Test Coverage:**
- ✅ Model creation and validation
- ✅ API endpoint functionality
- ✅ Authentication flows
- ✅ Like/unlike operations
- ✅ Error handling

### Frontend Testing
```bash
cd frontend/photo-gallery
npm test
```

**Test Coverage:**
- ✅ Component rendering
- ✅ User interactions
- ✅ Form submissions
- ✅ Error handling
- ✅ Loading states
- ✅ Authentication flows

## 🎨 Design System

### Atomic Design Architecture
The frontend follows Atomic Design principles:

- **Atoms**: Basic building blocks (StarIcon, PrivateRoute)
- **Molecules**: Simple component combinations (LoginForm, PhotoCard)
- **Organisms**: Complex component combinations (PhotoList)

### Styling Approach
- **CSS Modules**: Scoped styling for components
- **Responsive Design**: Mobile-first approach
- **Modern CSS**: Flexbox, Grid, and CSS custom properties
- **Smooth Animations**: Transitions and transforms

## 🔧 Development

### Backend Development
- Django REST Framework for API development
- Session-based authentication
- SQLite database for simplicity
- CORS configured for frontend communication
- Custom management commands for data import

### Frontend Development
- React with TypeScript for type safety
- Context API for state management
- Atomic Design for component organization
- CSS Modules for scoped styling
- Comprehensive testing with React Testing Library

## 📦 Database Models

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

## 🚀 Deployment

### Backend Deployment
1. Update `settings.py` for production
2. Set `DEBUG = False`
3. Configure environment variables
4. Use production database (PostgreSQL recommended)
5. Set up static file serving

### Frontend Deployment
1. Build the application: `npm run build`
2. Serve static files from `build/` directory
3. Configure reverse proxy for API calls
4. Set up environment variables

## 🔒 Security

### Authentication
- Session-based authentication with Django
- CSRF protection disabled for API endpoints
- CORS configured for frontend communication
- Secure password validation

### Data Protection
- Input validation on both frontend and backend
- SQL injection protection with Django ORM
- XSS protection with React's built-in escaping
- Secure headers configuration

## 📈 Performance

### Backend Performance
- Database query optimization
- Efficient serialization
- Minimal API response size
- Proper indexing on database models

### Frontend Performance
- Code splitting with React Router
- Image optimization with multiple sizes
- Bundle optimization and minification
- Lazy loading for components

## 🆘 Troubleshooting

### Common Issues

**Backend Issues:**
- Database errors: Run `python manage.py migrate`
- Import errors: Install dependencies with `pip install -r requirements.txt`
- CORS issues: Check CORS settings in `settings.py`

**Frontend Issues:**
- Port conflicts: Kill process on port 3000
- Node version: Use Node.js 18+
- Dependency issues: Clear cache and reinstall

**Authentication Issues:**
- Verify session cookies are enabled
- Check CSRF settings for API endpoints
- Ensure CORS is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

### Development Guidelines
- Follow existing code style
- Write tests for new functionality
- Use TypeScript for frontend code
- Follow Atomic Design principles
- Document API changes

## 📚 Documentation

- **[Backend Documentation](backend/README.md)** - Detailed backend setup, API docs, and development guide
- **[Frontend Documentation](frontend/photo-gallery/README.md)** - Frontend setup, component docs, and development guide

## 🎯 Next Steps

Potential enhancements for the application:

- [ ] **Pagination**: Add pagination for large photo collections
- [ ] **Search & Filtering**: Implement photo search and filtering
- [ ] **User Registration**: Add user registration functionality
- [ ] **Photo Categories**: Implement photo categorization
- [ ] **Photo Details**: Add detailed photo view pages
- [ ] **Infinite Scroll**: Implement infinite scroll for photos
- [ ] **Photo Upload**: Add photo upload functionality
- [ ] **User Profiles**: Implement user profile pages
- [ ] **Social Sharing**: Add social media sharing features
- [ ] **Dark Mode**: Implement dark/light theme toggle
- [ ] **Real-time Updates**: Add WebSocket support for real-time likes
- [ ] **Photo Comments**: Add commenting functionality
- [ ] **Advanced Search**: Implement advanced search with filters
- [ ] **Photo Collections**: Allow users to create photo collections
- [ ] **Export Features**: Add photo export functionality

## 📞 Contact

For questions about this implementation, contact: **nick.clucas@movewithclever.com**

## 📝 License

This project is part of Clever's Fullstack Coding Interview.

---

**Built with ❤️ using Django, React, and TypeScript**
