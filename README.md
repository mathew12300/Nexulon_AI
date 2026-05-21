# Nexulon AI

**Your Autonomous Career Intelligence System**

An AI-powered career platform that accelerates professional growth through intelligent job matching, resume optimization, application automation, and personalized career coaching.

---

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 13+

### Backend Setup
```powershell
cd "C:\Users\jwmat\OneDrive\Desktop\Nexulon_AI"
python -m venv venv
.\venv\Scripts\Activate.ps1   # PowerShell
# OR in Command Prompt:
# venv\Scripts\activate.bat
pip install -r backend_requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 📁 Project Structure

```
nexulon-ai/
├── backend/                 # Django REST API
│   ├── config/             # Project settings
│   ├── apps/               # Django applications
│   │   ├── users/          # User management & auth
│   │   ├── careers/        # Career profiles
│   │   ├── jobs/           # Job matching engine
│   │   ├── applications/   # Application tracking
│   │   └── ai/             # AI/ML features
│   ├── requirements.txt
│   └── manage.py
│
├── frontend/                # React application
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page routes
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # Context/state management
│   │   ├── styles/         # Design system
│   │   └── App.jsx
│   ├── package.json
│   └── public/
│
├── docs/                    # Documentation
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   ├── API_SPEC.md
│   ├── DATABASE_SCHEMA.md
│   └── FEATURES.md
│
└── README.md
```

---

## 🎨 Design System

**Brand Colors:**
- **Primary Purple**: `#7C3AED` (Vibrant, forward-thinking)
- **Secondary Cyan**: `#06B6D4` (Tech, modern)
- **Dark BG**: `#0F172A` (Sleek, professional)
- **Accent Gold**: `#F59E0B` (Highlight achievements)
- **Success Green**: `#10B981` (Positive actions)

**Typography:**
- **Headlines**: Inter Bold (24-32px)
- **Body**: Inter Regular (14-16px)
- **Code**: JetBrains Mono (12-14px)

---

## 🧠 AI Features

1. **Job Matching Engine** - ML-powered job recommendations
2. **Resume AI** - Auto-optimize resumes for ATS & specific roles
3. **Application Bot** - Automate job applications with smart form filling
4. **Career Advisor** - AI chatbot with career guidance
5. **Interview Prep** - AI mock interviews with feedback
6. **Salary Insights** - Market data + negotiation tips

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh token

### User Profile
- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update profile
- `GET /api/users/me/career` - Get career profile

### Jobs
- `GET /api/jobs` - List jobs with filters
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs/{id}/apply` - Apply to job
- `GET /api/jobs/recommendations` - AI-powered recommendations

### Applications
- `GET /api/applications` - List user applications
- `GET /api/applications/{id}` - Get application details
- `PATCH /api/applications/{id}` - Update application status

---

## 📊 Database Schema

See `docs/DATABASE_SCHEMA.md` for complete schema.

**Key Models:**
- `User` - Core user account
- `CareerProfile` - User career data
- `Job` - Job listings
- `Application` - Application tracking
- `Resume` - Resume storage
- `Interview` - Interview prep history

---

## 🛠 Tech Stack

### Backend
- **Framework**: Django 4.2
- **API**: Django REST Framework
- **Database**: PostgreSQL
- **Auth**: JWT (djangorestframework-simplejwt)
- **AI/ML**: OpenAI API, Hugging Face, Scikit-learn
- **Task Queue**: Celery + Redis
- **Search**: Elasticsearch

### Frontend
- **Framework**: React 18
- **State**: Zustand
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS
- **HTTP**: Axios
- **Charts**: Recharts
- **Animations**: Framer Motion

---

## 📝 Environment Variables

### Backend (.env)
```
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/nexulon
OPENAI_API_KEY=your-key
JWT_SECRET=your-jwt-secret
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Nexulon AI
```

---

## 🚀 Deployment

### Backend (Docker)
```bash
docker build -f backend/Dockerfile -t nexulon-api .
docker run -p 8000:8000 nexulon-api
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

---

## 📚 Documentation

- [Design System](./docs/DESIGN_SYSTEM.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [API Specification](./docs/API_SPEC.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Features Roadmap](./docs/FEATURES.md)

---

## 👥 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open Pull Request

---

## 📄 License

MIT License - See LICENSE file

---

## 🤝 Support

For questions or support, email: support@nexulon.ai

---

**Built with 🚀 by the Nexulon AI team**
