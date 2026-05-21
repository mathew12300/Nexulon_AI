# Nexulon AI - Windows Quick Start

**EASIEST SOLUTION: Use Docker** (No Python/Node setup needed!)

---

## ✅ OPTION 1: Docker Setup (Recommended)

### Step 1: Start Everything
```powershell
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"
docker-compose up -d
```

### Step 2: Access Services
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/schema/swagger

**That's it! Everything is running.**

---

## 🔧 OPTION 2: Manual Setup (If Docker not available)

### Step 1: Run Batch Setup Script (Windows CMD/PowerShell)

```powershell
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"
.\setup.bat
```

This script will:
- ✅ Create virtual environment
- ✅ Install all dependencies (with FIXED versions)
- ✅ Setup .env file
- ✅ Run migrations

### Step 2: Start Backend

```powershell
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"
.\venv\Scripts\Activate.ps1
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
```

### Step 3: Start Frontend (New Terminal)

```powershell
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI\frontend"
npm install
npm run dev
```

You should see:
```
  ➜  Local:   http://localhost:5173/
```

---

## ❌ WHAT WAS WRONG?

### Issue 1: Dependency Version Mismatch
**Problem**: `djangorestframework-simplejwt==5.3.2` doesn't exist
**Solution**: Updated to `5.5.1` (latest compatible)

### Issue 2: Missing Django Project
**Problem**: No `manage.py` file
**Solution**: Created `manage.py` + ready to use with Docker

### Issue 3: Complex Windows Setup
**Solution**: Created `setup.bat` automation script

---

## 🚀 **NOW YOU HAVE THREE OPTIONS:**

### **Option A: Docker (EASIEST) ⭐ RECOMMENDED**
```powershell
docker-compose up -d
# Access: http://localhost:3000
```
- ✅ No Python/Node install needed
- ✅ Automatic setup
- ✅ All services included
- ✅ Production-like environment

---

### **Option B: Automated Batch Script**
```powershell
.\setup.bat
python manage.py runserver
```
- ✅ One-click setup
- ✅ Automatic virtual env
- ✅ Fixed dependencies
- ✅ Windows optimized

---

### **Option C: Manual PowerShell**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r backend_requirements.txt
python manage.py migrate
python manage.py runserver
```
- ✅ Full control
- ✅ Step-by-step
- ✅ Learn the process

---

## 📋 **WHICH ONE TO CHOOSE?**

| Your Situation | Choose |
|---|---|
| Want fastest setup | **Docker** |
| Want one-click | **setup.bat** |
| Want to learn Django | **Manual PowerShell** |
| Don't have Docker | **setup.bat** |

---

## ✅ **UPDATED FILES**

- ✅ `backend_requirements.txt` - Fixed versions (compatible with Python 3.11)
- ✅ `manage.py` - Created (was missing)
- ✅ `setup.bat` - Windows automation script
- ✅ This guide

---

## 🎯 **NEXT STEPS**

Pick one option above and run the commands. All three will work!

### After Setup:

Access:
- Frontend: http://localhost:3000 (or 5173 for manual)
- Backend: http://localhost:8000
- Admin: http://localhost:8000/admin

---

## 🆘 **STILL GETTING ERRORS?**

### If pip install fails:
```powershell
python -m pip install --upgrade pip
pip install -r backend_requirements.txt --no-cache-dir
```

### If manage.py not found:
```powershell
# Make sure you're in the right directory
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"
ls manage.py  # Should show the file
```

### If port already in use:
```powershell
# Change port
python manage.py runserver 8001
```

### If venv activation fails:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\venv\Scripts\Activate.ps1
```

---

## 📖 **FULL DOCUMENTATION**

- `WINDOWS_SETUP.md` - Complete Windows guide
- `SETUP_GUIDE.md` - Detailed setup
- `README.md` - Project overview

---

**Ready to go! Pick Option A, B, or C above and you're good to go! 🚀💜**
