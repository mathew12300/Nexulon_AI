# Nexulon AI - Project Setup & Development Guide

Complete setup instructions and development workflow for the Nexulon AI platform.

---

## 📋 Project Overview

**Nexulon AI** is an AI-powered career platform that accelerates professional growth through:
- 🎯 Intelligent job matching
- 📄 Resume AI optimization
- 🤖 Interview preparation
- 🔗 Application automation
- 📊 Career coaching

**Tech Stack:**
- Backend: Django 4.2 + Python 3.11
- Frontend: React 18 + TypeScript
- Database: PostgreSQL
- Cache: Redis
- Search: Elasticsearch
- AI: OpenAI GPT-4, Hugging Face

---

## 🚀 Quick Start (Development)

### Prerequisites
```bash
# Install Python 3.11+
python --version

# Install Node.js 18+
node --version

# Install Docker & Docker Compose
docker --version
```

### Setup Backend

```bash
# Navigate to project
cd /path/to/nexulon-ai

# Create virtual environment
python -m venv venv

# Activate (macOS/Linux)
source venv/bin/activate
# Or Windows
venv\Scripts\activate

# Install dependencies
pip install -r backend_requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your values
nano .env

# Run migrations
python manage.py migrate

# Create superuser (admin)
python manage.py createsuperuser

# Start development server
python manage.py runserver
# Accessible at http://localhost:8000
```

### Setup Frontend

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
# Or with npm >= 9
npm ci

# Start development server
npm run dev
# Accessible at http://localhost:5173
```

### Setup Database & Services (Docker)

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

---

## 📁 Project Structure

```
nexulon-ai/
├── backend/                     # Django application
│   ├── config/                 # Project settings
│   │   ├── settings.py        # Main Django settings
│   │   ├── urls.py            # URL routing
│   │   └── wsgi.py            # WSGI config
│   ├── apps/                   # Django applications
│   │   ├── users/             # User management
│   │   ├── careers/           # Career profiles
│   │   ├── jobs/              # Job listings & matching
│   │   ├── applications/      # Job applications
│   │   ├── ai/                # AI features
│   │   └── interviews/        # Interview prep
│   ├── tests/                  # Test files
│   ├── manage.py              # Django management
│   └── requirements.txt        # Python dependencies
│
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── hooks/             # Custom hooks
│   │   ├── services/          # API services
│   │   ├── context/           # State management
│   │   ├── styles/            # Global styles
│   │   └── App.jsx            # Root component
│   ├── public/                # Static assets
│   ├── package.json           # NPM dependencies
│   └── vite.config.ts         # Vite config
│
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md         # System design
│   ├── API_SPEC.md            # API documentation
│   ├── DATABASE_SCHEMA.md     # DB schema
│   ├── DESIGN_SYSTEM.md       # UI/UX guidelines
│   └── FEATURES_ROADMAP.md    # Feature roadmap
│
├── docker-compose.yml          # Docker services
├── Dockerfile.backend          # Backend image
├── Dockerfile.frontend         # Frontend image
├── .env.example               # Environment template
├── .github/workflows/         # CI/CD pipelines
└── README.md                  # This file
```

---

## 🔑 Environment Variables

Create `.env` file in project root:

```bash
# Copy template
cp .env.example .env

# Edit with your values
export $(cat .env | xargs)
```

**Critical Variables:**
- `DEBUG` - Set to False in production
- `SECRET_KEY` - Change to secure random string
- `DATABASE_URL` - PostgreSQL connection
- `OPENAI_API_KEY` - For AI features
- `ALLOWED_HOSTS` - Your domain names

---

## 🗄 Database Management

### Create Migrations

```bash
python manage.py makemigrations

# Check migration SQL
python manage.py sqlmigrate app_name 0001
```

### Apply Migrations

```bash
python manage.py migrate

# Migrate specific app
python manage.py migrate app_name
```

### Reset Database (Dev Only)

```bash
# Delete all data
python manage.py flush --noinput

# Recreate from migrations
python manage.py migrate

# Load sample data
python manage.py loaddata fixtures/sample_data.json
```

### Backup Database

```bash
# Dump PostgreSQL
pg_dump nexulon_db > backup.sql

# Restore
psql nexulon_db < backup.sql
```

---

## 🧪 Testing

### Backend Tests

```bash
# Run all tests
pytest

# Run specific test file
pytest backend/apps/jobs/tests/test_models.py

# With coverage
pytest --cov=backend --cov-report=html

# Run specific test
pytest backend/apps/jobs/tests/test_models.py::TestJobModel::test_job_creation
```

### Frontend Tests

```bash
# Run tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

---

## 🔍 Code Quality

### Linting

```bash
# Backend
flake8 backend/
pylint backend/
black backend/

# Frontend
npm run lint
```

### Type Checking

```bash
# Backend - mypy
mypy backend/

# Frontend - TypeScript
npm run type-check
```

### Formatting

```bash
# Backend - Black
black backend/

# Frontend - Prettier
npm run format
```

---

## 🚀 Deployment

### Docker Build

```bash
# Build images
docker build -f Dockerfile.backend -t nexulon-api .
docker build -f Dockerfile.frontend -t nexulon-web .

# Run containers
docker run -p 8000:8000 nexulon-api
docker run -p 3000:80 nexulon-web
```

### Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Change `SECRET_KEY`
- [ ] Set `ALLOWED_HOSTS` correctly
- [ ] Configure HTTPS/SSL
- [ ] Set up CORS properly
- [ ] Configure email service
- [ ] Set up monitoring (Sentry)
- [ ] Enable rate limiting
- [ ] Set up backups
- [ ] Configure logging

### Kubernetes Deployment

```bash
# Create namespace
kubectl create namespace nexulon

# Deploy services
kubectl apply -f k8s/production/ -n nexulon

# Check status
kubectl get pods -n nexulon

# View logs
kubectl logs -f pod/nexulon-api-xyz -n nexulon

# Scale deployment
kubectl scale deployment/nexulon-api --replicas=3 -n nexulon
```

---

## 🔐 Security

### Authentication

```python
# Django REST Framework
from rest_framework_simplejwt.authentication import JWTAuthentication

class MyView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
```

### Secrets Management

```bash
# Use environment variables (no .env in git)
echo ".env" >> .gitignore

# Use secure vaults
# AWS Secrets Manager
# HashiCorp Vault
# Azure Key Vault
```

### Password Security

```python
# Django handles hashing automatically
from django.contrib.auth.hashers import make_password

password_hash = make_password('my_password')
```

---

## 🐛 Debugging

### Django Debug Toolbar

```python
# In settings.py (DEV only)
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
```

### Console Logging

```python
import logging
logger = logging.getLogger(__name__)

logger.debug("Debug message")
logger.info("Info message")
logger.warning("Warning message")
logger.error("Error message")
```

### Database Queries

```python
from django.db import connection
from django.test.utils import override_settings

@override_settings(DEBUG=True)
def check_queries():
    print(f"Queries executed: {len(connection.queries)}")
    for query in connection.queries:
        print(query)
```

---

## 📊 API Development

### Add New Endpoint

```python
# apps/jobs/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def job_list(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

# apps/jobs/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.job_list, name='job-list'),
]
```

### API Documentation

- OpenAPI/Swagger: `http://localhost:8000/api/schema/swagger/`
- ReDoc: `http://localhost:8000/api/schema/redoc/`

---

## 🚀 Performance Tips

### Database Optimization

```python
# Use select_related for foreign keys
queryset = Application.objects.select_related('job', 'user')

# Use prefetch_related for many-to-many
queryset = Job.objects.prefetch_related('skills')

# Add database indexes
class Meta:
    indexes = [
        models.Index(fields=['user', 'status']),
    ]
```

### Caching

```python
from django.views.decorators.cache import cache_page

@cache_page(60 * 5)  # Cache for 5 minutes
def expensive_view(request):
    # Expensive computation
    return Response(data)
```

### Async Tasks

```python
from celery import shared_task

@shared_task
def send_application_email(application_id):
    # Long-running task
    application = Application.objects.get(id=application_id)
    # Send email...
    return f"Email sent to {application.user.email}"

# Call async
send_application_email.delay(app_id)
```

---

## 📚 Useful Commands

```bash
# Backend
python manage.py shell              # Python REPL with Django context
python manage.py dbshell            # PostgreSQL shell
python manage.py createsuperuser    # Create admin user
python manage.py collectstatic      # Collect static files
python manage.py dumpdata > data.json  # Export data
python manage.py loaddata data.json # Import data

# Frontend
npm run build                       # Build for production
npm run preview                    # Preview production build
npm run type-check                 # TypeScript checking

# Docker
docker-compose exec backend python manage.py migrate  # Run migrations in container
docker-compose exec frontend npm run build            # Build in container
docker-compose logs --tail=50 backend                # View recent logs
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m "Add amazing feature"`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

### Commit Message Format

```
type: description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat: add job recommendation API endpoint

- Implement ML-based job matching algorithm
- Add unit tests for matching logic
- Update API documentation

Closes #123
```

---

## 📞 Support

- **Documentation**: `/docs`
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@nexulon.ai

---

## 📄 License

MIT License - See LICENSE file

---

## 🎉 Happy Coding!

Questions? Check the documentation or open an issue!

**Built with 🚀 by the Nexulon AI team**
