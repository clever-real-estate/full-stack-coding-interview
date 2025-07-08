# Photo Gallery Backend

A Django REST Framework application providing API endpoints for photo gallery management with user authentication and like functionality.

## Features

- 🔐 JWT authentication with refresh tokens
- 📸 Photo management with pagination
- ❤️ Like/unlike functionality
- 🔒 Input validation and security measures
- 📚 API documentation with Swagger/OpenAPI
- 🗄️ PostgreSQL database with Supabase

## Getting Started

### Prerequisites

- Python 3.11 or later
- PostgreSQL (or Supabase account)
- pip or pipenv

### Installation

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements/development.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser (optional):
```bash
python manage.py createsuperuser
```

6. Import photos from CSV:
```bash
python manage.py import_photos ../photos.csv
```

7. Start the development server:
```bash
python manage.py runserver
```

8. Open [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/) for API documentation.

## Project Structure

```
src/
├── config/                 # Django settings
│   ├── settings/
│   │   ├── base.py        # Common settings
│   │   ├── development.py # Development settings
│   │   └── production.py  # Production settings
│   ├── urls.py           # Root URL configuration
│   └── wsgi.py           # WSGI entry point
├── apps/
│   ├── authentication/   # User auth app
│   ├── photos/          # Photo management app
│   └── likes/           # Like system app
└── utils/               # Shared utilities
```

## API Endpoints

### Authentication
- `POST /api/auth/token/` - Sign in (get JWT)
- `POST /api/auth/token/refresh/` - Refresh JWT
- `POST /api/auth/logout/` - Sign out

### Photos
- `GET /api/photos/` - List photos (paginated)
- `GET /api/photos/{id}/` - Get photo details
- `POST /api/photos/{id}/like/` - Like/unlike photo

## Available Commands

- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Run database migrations
- `python manage.py makemigrations` - Create new migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py import_photos <csv_file>` - Import photos from CSV
- `python manage.py test` - Run tests

## Technologies Used

- **Django 5.0** - Web framework
- **Django REST Framework** - API framework
- **SimpleJWT** - JWT authentication
- **PostgreSQL** - Database
- **Supabase** - Database hosting
- **drf-spectacular** - API documentation

## Environment Variables

Create a `.env` file with:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=photo_gallery_dev
DB_USER=postgres
DB_PASSWORD=your-database-password
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## Testing

Run tests with:
```bash
python manage.py test
```

For coverage:
```bash
pip install coverage
coverage run --source='.' manage.py test
coverage report
```