# Nexulon AI - Windows PowerShell Setup Guide

Complete setup instructions for Windows using PowerShell.

---

## ✅ Prerequisites

Verify you have installed:

```powershell
# Check Python
python --version
# Should show: Python 3.11+ (or python3 --version)

# Check Node.js
node --version
# Should show: v18+

# Check npm
npm --version
# Should show: 9+

# Check Docker
docker --version
# Should show: Docker version

# Check Docker Compose
docker-compose --version
# Should show: Docker Compose version
```

If any are missing, install from:
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/
- Docker: https://www.docker.com/products/docker-desktop

---

## 🚀 Quick Start (Option 1: Docker - Easiest)

### Start All Services with Docker Compose

```powershell
# Navigate to project
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"

# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs
docker-compose logs -f

# Stop services when done
docker-compose down
```

**Access:**
- Frontend: http://localhost:3000
- API: http://localhost:8000/api
- Admin: http://localhost:8000/admin
- API Docs: http://localhost:8000/api/schema/swagger

---

## 🔧 Manual Setup (Option 2: Local Development)

### Step 1: Setup Backend (Terminal 1)

```powershell
# Navigate to project
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"

# Create virtual environment
python -m venv venv

# Activate virtual environment (WINDOWS POWERSHELL)
.\venv\Scripts\Activate.ps1

# If you get execution policy error, run this first:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Verify activation (should show (venv) prefix)
# You should see: (venv) PS C:\...>

# Install Python dependencies
pip install -r backend_requirements.txt

# Copy environment file
Copy-Item .env.example .env

# Edit .env with your configuration (open in notepad or VS Code)
# notepad .env
# OR
code .env

# Run database migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
# Follow prompts to create username/password

# Start Django development server
python manage.py runserver

# You should see:
# Starting development server at http://127.0.0.1:8000/
```

**Keep this terminal open. Backend runs at http://localhost:8000**

---

### Step 2: Setup Frontend (Terminal 2 - New Window)

Open a **NEW PowerShell window** and run:

```powershell
# Navigate to frontend folder
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI\frontend"

# Install Node dependencies
npm install

# Start React development server
npm run dev

# You should see:
# ➜  Local:   http://localhost:5173/
```

**Keep this terminal open. Frontend runs at http://localhost:5173**

---

### Step 3: Setup Database & Services (Terminal 3 - Optional)

If you want to use PostgreSQL, Redis, etc., open a **THIRD PowerShell window**:

```powershell
# Navigate to project
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"

# Start database services only (PostgreSQL, Redis, Elasticsearch)
docker-compose up -d postgres redis elasticsearch

# Verify they're running
docker-compose ps

# Connect to PostgreSQL (if needed)
# docker exec -it nexulon_postgres psql -U postgres -d nexulon_db
```

---

## 🎯 Access Your Application

Once all services are running, access:

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| Admin Panel | http://localhost:8000/admin |
| API Documentation | http://localhost:8000/api/schema/swagger |
| API ReDoc | http://localhost:8000/api/schema/redoc |

---

## 🧪 Run Tests

### Backend Tests (in backend terminal)

```powershell
# Make sure venv is activated: (venv) should show in prompt
# If not, run: .\venv\Scripts\Activate.ps1

pytest
# or
pytest backend/ -v
```

### Frontend Tests (in frontend terminal)

```powershell
cd frontend
npm run test
```

---

## 📦 Common PowerShell Commands

### Virtual Environment

```powershell
# Activate (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# If you get execution policy error:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Deactivate
deactivate

# Delete virtual environment
Remove-Item -Recurse -Force venv
```

### Python Commands

```powershell
# Run Python
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Open Django shell
python manage.py shell

# Collect static files
python manage.py collectstatic --noinput

# Create superuser
python manage.py createsuperuser

# Flush database (WARNING: deletes all data)
python manage.py flush
```

### NPM Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm run test
```

### Docker Commands

```powershell
# Start all services
docker-compose up -d

# View running services
docker-compose ps

# View logs (all)
docker-compose logs

# View logs (follow)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f backend

# Stop services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Execute command in container
docker-compose exec backend python manage.py migrate

# Open bash in container
docker-compose exec backend bash
# Or PowerShell:
docker-compose exec backend pwsh
```

---

## ⚙️ Environment Configuration

### Copy the example file

```powershell
Copy-Item .env.example .env
```

### Edit the file

```powershell
# Open in VS Code
code .env

# Or open in Notepad
notepad .env

# Or use PowerShell to edit
(Get-Content .env.example) -replace 'PLACEHOLDER', 'YOUR_VALUE' | Set-Content .env
```

### Essential variables to set

```
DEBUG=False
SECRET_KEY=your-super-secret-key-change-this
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nexulon_db
OPENAI_API_KEY=sk-your-openai-key
```

---

## 🐛 Troubleshooting

### Issue: "Port already in use"

```powershell
# Find what's using the port
netstat -ano | findstr ":8000"
# or
Get-NetTCPConnection -LocalPort 8000

# Kill the process (if PID is 12345)
Stop-Process -Id 12345 -Force

# Or change port in django settings
python manage.py runserver 8001
```

### Issue: "Virtual environment not activating"

```powershell
# Check if execution policy blocks it
Get-ExecutionPolicy

# Set to RemoteSigned
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Try activating again
.\venv\Scripts\Activate.ps1
```

### Issue: "npm: command not found"

```powershell
# Verify Node.js is installed
node --version

# If not installed, install from https://nodejs.org/

# Verify npm
npm --version

# Update npm
npm install -g npm@latest
```

### Issue: "Python: command not found"

```powershell
# Verify Python is installed
python --version

# If not, install from https://www.python.org/downloads/
# Make sure to check "Add Python to PATH" during installation

# Restart PowerShell after installing

# Or use python3
python3 --version
python3 -m venv venv
python3 manage.py runserver
```

### Issue: "Docker daemon is not running"

```powershell
# On Windows, Docker Desktop must be running

# Check status
docker ps

# If error, open Docker Desktop app and wait for it to start
# Then try again:
docker-compose up -d
```

### Issue: "Database connection error"

```powershell
# Start database service
docker-compose up -d postgres

# Wait a few seconds, then check
docker-compose logs postgres

# Try migration again
python manage.py migrate
```

### Issue: "Module not found" error

```powershell
# Make sure venv is activated: (venv) should show
.\venv\Scripts\Activate.ps1

# Reinstall dependencies
pip install -r backend_requirements.txt

# For frontend
cd frontend
npm install
```

---

## 🔄 Development Workflow

### Day 1: Setup

```powershell
# Terminal 1: Backend
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"
.\venv\Scripts\Activate.ps1
python manage.py runserver

# Terminal 2: Frontend
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI\frontend"
npm run dev

# Terminal 3: Services (optional)
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"
docker-compose up -d postgres redis
```

### Working on Backend

```powershell
# In backend terminal
.\venv\Scripts\Activate.ps1

# Create models
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Make code changes...

# Test
pytest

# Django will auto-reload on file changes
```

### Working on Frontend

```powershell
# In frontend terminal
cd frontend

# Make code changes...
# Vite will auto-reload on file changes

# Build for production
npm run build

# Preview build
npm run preview
```

### Stopping Services

```powershell
# Stop frontend (Ctrl+C in frontend terminal)
# Ctrl+C

# Stop backend (Ctrl+C in backend terminal)
# Ctrl+C

# Stop docker services
docker-compose down

# Or in same terminal
docker-compose stop
```

---

## 📋 Useful Scripts

### Quick Setup Script

Create a file named `setup.ps1`:

```powershell
# setup.ps1
Write-Host "Setting up Nexulon AI..." -ForegroundColor Green

# Create virtual environment
Write-Host "Creating virtual environment..." -ForegroundColor Yellow
python -m venv venv

# Activate
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
.\venv\Scripts\Activate.ps1

# Install dependencies
Write-Host "Installing Python dependencies..." -ForegroundColor Yellow
pip install -r backend_requirements.txt

# Copy env
Write-Host "Creating .env file..." -ForegroundColor Yellow
Copy-Item .env.example .env

# Migrate
Write-Host "Running migrations..." -ForegroundColor Yellow
python manage.py migrate

Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Run 'python manage.py runserver' to start backend" -ForegroundColor Cyan
```

Run it:

```powershell
.\setup.ps1
```

### Quick Start Script

Create `start.ps1`:

```powershell
# start.ps1
Write-Host "Starting Nexulon AI..." -ForegroundColor Green

# Start backend
Write-Host "Starting backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$PWD'; .\venv\Scripts\Activate.ps1; python manage.py runserver`""

# Start frontend
Write-Host "Starting frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$PWD\frontend'; npm run dev`""

# Start services
Write-Host "Starting services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host "All services starting..." -ForegroundColor Green
```

Run it:

```powershell
.\start.ps1
```

---

## 🌐 Accessing Services

| Service | URL | Login |
|---------|-----|-------|
| Frontend | http://localhost:5173 | Sign up |
| Backend | http://localhost:8000 | - |
| Admin | http://localhost:8000/admin | Superuser creds |
| API Docs | http://localhost:8000/api/schema/swagger | - |

---

## 💾 Database Commands

### Using PostgreSQL

```powershell
# Connect to database
docker-compose exec postgres psql -U postgres -d nexulon_db

# Common SQL commands (after psql prompt)
\dt              # List tables
\du              # List users
SELECT * FROM users;  # Query data
\q               # Quit
```

### Backup Database

```powershell
# Export
docker-compose exec postgres pg_dump -U postgres nexulon_db > backup.sql

# Import
docker-compose exec -T postgres psql -U postgres nexulon_db < backup.sql
```

---

## 📝 Next Steps

1. **Complete setup** using the Quick Start above
2. **Verify services** are running
3. **Read documentation**:
   - `SETUP_GUIDE.md` - Detailed setup
   - `DESIGN_SYSTEM.md` - UI guidelines
   - `API_SPEC.md` - API endpoints
4. **Start developing**
5. **Run tests** before committing

---

## 🆘 Need Help?

| Issue | Check |
|-------|-------|
| Services won't start | Docker Desktop running? |
| Port already in use | Check `netstat -ano \| findstr ":PORT"` |
| venv won't activate | Check execution policy with `Get-ExecutionPolicy` |
| Python not found | Add to PATH or use `python3` |
| npm not found | Reinstall Node.js |
| Database error | Restart docker: `docker-compose down -v && docker-compose up -d` |

---

## ✅ You're Ready!

All services should now be running on Windows PowerShell. 🎉

**Frontend**: http://localhost:5173
**Backend**: http://localhost:8000

Happy coding! 💜

---

**Last Updated**: 2024
**Platform**: Windows PowerShell
**Status**: Ready to develop
