# Project Setup Instructions

## Technology Stack

- **Frontend Framework**: Next.js with TypeScript
- **Build Tool**: npm
- **Styling**: Tailwind CSS
- **Backend**: Python and Django, Supabase

## Development Setup

### Frontend Project Structure

```
src/
├── components/     # React components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
└── styles/        # Global styles and Tailwind config
```

### Backend Project Structure

```
src/
├── api/                   # API-related code (Django REST Framework)
│   ├── views/            # API viewsets or views
│   ├── serializers/      # Serializers for API data
│   ├── urls/             # API-specific URL configurations
│   └── tests/            # Tests for API endpoints
├── apps/                  # Django apps (modular business logic)
│   ├── app_name/         # Example app (e.g., users, products)
│   │   ├── migrations/   # Database migrations
│   │   ├── models/       # Django models
│   │   ├── views/        # Business logic views
│   │   ├── admin/        # Admin panel configurations
│   │   ├── tests/        # Unit tests for app
│   │   └── __init__.py
│   └── __init__.py
├── config/                # Project-wide configuration
│   ├── settings/         # Django settings (split for modularity)
│   │   ├── base.py       # Common settings
│   │   ├── dev.py        # Development environment settings
│   │   ├── prod.py       # Production environment settings
│   │   └── __init__.py
│   ├── urls.py           # Root URL configuration
│   └── wsgi.py           # WSGI entry point
├── utils/                 # Utility functions and helpers
│   ├── helpers.py        # General-purpose utilities
│   ├── auth.py           # Authentication-related utilities
│   └── __init__.py
├── scripts/               # Management scripts
│   ├── seed.py           # Database seeding scripts
│   └── __init__.py
├── static/                # Static files (if served by Django)
├── templates/             # HTML templates (if needed)
├── tests/                 # Project-wide tests
│   ├── integration/      # Integration tests
│   ├── unit/             # Unit tests
│   └── __init__.py
├── requirements/          # Dependency management
│   ├── base.txt          # Common dependencies
│   ├── dev.txt           # Development dependencies
│   └── prod.txt          # Production dependencies
```

## Development Guidelines

### TypeScript

- Use strict mode for type safety
- Define interfaces for all data models
- Avoid using `any` type

### React Best Practices

- Use functional components with hooks
- Implement proper error boundaries
- Keep components small and focused
- Use React.memo for performance optimization when needed

### Tailwind CSS

- Use utility classes for styling
- Create custom components for repeated patterns
- Configure theme in `tailwind.config.js`

### State Management

- Use React Context for simple global state
- Consider React Query for server state
- Consider Zustand for complex state management
- Keep component state local when possible
- Avoid prop drilling by leveraging state management tools

### Test

- Always write unit and integration tests after finishing a task
- Validate if all test passes before moving on to the next task