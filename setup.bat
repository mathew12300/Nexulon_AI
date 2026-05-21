@echo off
REM Nexulon AI - Windows Setup Script
REM This script sets up the complete development environment

echo.
echo ===================================
echo  Nexulon AI - Windows Setup
echo ===================================
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Download from: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check if venv exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
)

REM Activate venv
echo Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)

REM Update pip
echo Updating pip...
python -m pip install --upgrade pip

REM Install requirements
echo Installing Python dependencies...
pip install -r backend_requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    echo Try running: pip install --upgrade pip
    pause
    exit /b 1
)

REM Copy env file
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo IMPORTANT: Edit .env file with your configuration
)

REM Run migrations
echo Running database migrations...
python manage.py migrate --noinput
if errorlevel 1 (
    echo WARNING: Migration failed. This might be normal if database isn't configured.
)

echo.
echo ===================================
echo  Setup Complete!
echo ===================================
echo.
echo To start the development server, run:
echo   python manage.py runserver
echo.
echo To start frontend dev server, open another terminal and run:
echo   cd frontend
echo   npm install
echo   npm run dev
echo.
pause
