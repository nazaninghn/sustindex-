# Sustindex - Full Stack Project Structure

## 📁 Project Overview

```
SUSIDEX/
├── sustindex-/              # Django Backend (Python)
│   ├── accounts/           # User management
│   ├── questionnaire/      # Surveys & questions
│   ├── elearning/          # E-learning module
│   ├── reports/            # Report generation
│   ├── templates/          # Django templates (legacy)
│   ├── static/             # Static files
│   ├── locale/             # Translations (EN/TR)
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/               # Next.js Frontend (React/TypeScript)
│   ├── app/               # Next.js pages
│   ├── components/        # React components
│   ├── public/            # Static assets
│   ├── package.json
│   └── ...
│
├── run-dev.bat            # Run both servers (Windows)
├── FRONTEND_SETUP_FA.md   # Frontend setup guide (Persian)
└── PROJECT_STRUCTURE.md   # This file
```

## 🏗️ Architecture

### Backend (Django)
- **Framework**: Django 5.0.6
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **API**: Django REST Framework with JWT authentication
- **Deployment**: Render.com
- **URL**: https://sustindex.onrender.com

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Option 1: Run Both Servers (Windows)
```bash
# Double click or run:
run-dev.bat
```

### Option 2: Manual Start

**Backend:**
```bash
cd sustindex-
python manage.py runserver
# Runs on http://localhost:8000
```

**Frontend:**
```bash
cd frontend
npm install  # First time only
npm run dev
# Runs on http://localhost:3000
```

## 🔗 API Integration

### Backend Endpoints
```
http://localhost:8000/api/v1/
├── auth/token/              # Login (JWT)
├── auth/token/refresh/      # Refresh token
├── users/                   # User management
├── surveys/                 # Surveys list
├── questions/               # Questions
├── attempts/                # Questionnaire attempts
├── answers/                 # Submit answers
└── docs/                    # API documentation (Swagger)
```

### Frontend Pages
```
http://localhost:3000/
├── /                        # Home page (✅ Implemented)
├── /login                   # Login page (🔜 Coming)
├── /register                # Register page (🔜 Coming)
├── /dashboard               # User dashboard (🔜 Coming)
└── /questionnaire/[id]      # Questionnaire flow (🔜 Coming)
```

## 📊 Current Status

### ✅ Completed
- Django backend with REST API
- PostgreSQL database setup
- JWT authentication
- API documentation (Swagger)
- Next.js frontend setup
- Home page with modern design
- Responsive layout
- Smooth animations
- Multi-language support (EN/TR)

### 🔜 In Progress
- Authentication pages (Login/Register)
- User dashboard
- Questionnaire flow
- Results visualization
- Full API integration

## 🎨 Design System

### Colors
```css
--primary: #1F7A63    /* Green */
--neutral: #2E2E2E    /* Dark Gray */
--accent: #4C6EF5     /* Blue */
--success: #28A745    /* Green */
--warning: #FF6B35    /* Orange */
--gold: #FFD700       /* Gold */
```

### Typography
- Font Family: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800

## 🔐 Environment Variables

### Backend (.env or Render environment)
```env
SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=postgresql://...
ALLOWED_HOSTS=sustindex.onrender.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📦 Dependencies

### Backend (requirements.txt)
- Django==5.0.6
- djangorestframework==3.14.0
- django-cors-headers==4.3.1
- djangorestframework-simplejwt==5.3.1
- drf-spectacular==0.27.1
- psycopg[binary]==3.2.3
- gunicorn==21.2.0
- whitenoise==6.6.0

### Frontend (package.json)
- next: 14.1.0
- react: 18.2.0
- typescript: 5
- tailwindcss: 3.3.0
- framer-motion: 11.0.3
- axios: 1.6.5

## 🚀 Deployment

### Backend (Render.com)
1. Connected to GitHub
2. Auto-deploy on push to main branch
3. Build command: `./build.sh`
4. Start command: `gunicorn sustindex.wsgi:application`

### Frontend (Vercel - Recommended)
```bash
cd frontend
vercel
```

Or connect GitHub repo to Vercel dashboard.

## 📝 Development Workflow

1. **Backend Changes**:
   ```bash
   cd sustindex-
   python manage.py makemigrations
   python manage.py migrate
   git add .
   git commit -m "Backend: description"
   git push
   ```

2. **Frontend Changes**:
   ```bash
   cd frontend
   # Make changes
   npm run build  # Test build
   git add .
   git commit -m "Frontend: description"
   git push
   ```

## 🧪 Testing

### Backend
```bash
cd sustindex-
python manage.py test
```

### Frontend
```bash
cd frontend
npm run lint
npm run build
```

## 📚 Documentation

- **API Docs**: http://localhost:8000/api/v1/docs/
- **Backend Setup**: `sustindex-/DEPLOYMENT.md`
- **Frontend Setup**: `FRONTEND_SETUP_FA.md`
- **API Guide**: `sustindex-/API_DOCUMENTATION.md`
- **Next.js Guide**: `sustindex-/NEXTJS_SETUP.md`

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Commit with clear messages
5. Push and create PR

## 📞 Support

- Backend Issues: Check Django logs
- Frontend Issues: Check browser console (F12)
- API Issues: Check `/api/v1/docs/` for endpoint details

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Backend API
- ✅ Home page frontend

### Phase 2 (Next)
- 🔜 Authentication pages
- 🔜 User dashboard
- 🔜 API integration

### Phase 3 (Future)
- 🔜 Questionnaire flow
- 🔜 Results visualization
- 🔜 PDF report generation
- 🔜 Admin dashboard

## 📄 License

See LICENSE file in root directory.

---

**Note**: Backend must be running for frontend authentication links to work!
