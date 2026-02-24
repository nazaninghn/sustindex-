# 🌱 SustIndex - Sustainability Assessment Platform

A comprehensive web-based platform for evaluating and tracking organizational sustainability performance across Environmental, Social, and Governance (ESG) dimensions.

## 🎯 Features

### Core Functionality
- **Multi-dimensional Assessment**: Evaluate sustainability across ESG categories
- **Interactive Questionnaires**: Dynamic forms with multiple choice support
- **Real-time Scoring**: Instant calculation of sustainability scores and grades
- **Document Management**: Upload supporting documents for each answer
- **Notes & Comments**: Add detailed explanations and context to answers
- **Progress Tracking**: Auto-save functionality with resume capability
- **Historical Data**: View and compare past assessment results
- **Recommendations**: AI-powered suggestions based on assessment scores

### Technical Features
- **Modern Stack**: Django REST Framework + Next.js 14
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **JWT Authentication**: Secure token-based authentication with auto-refresh
- **RESTful API**: Complete API documentation with Swagger/OpenAPI
- **Internationalization**: Multi-language support (English/Turkish)
- **Session Management**: Time-bound assessment sessions

## 🏗️ Architecture

```
sustindex/
├── sustindex-/          # Django Backend
│   ├── accounts/        # User management & authentication
│   ├── questionnaire/   # Core assessment logic
│   ├── elearning/       # Educational content
│   ├── reports/         # Reporting & analytics
│   └── api/             # REST API endpoints
│
└── frontend/            # Next.js Frontend
    ├── app/             # App Router pages
    ├── components/      # Reusable React components
    └── lib/             # Utilities & API client
```

## 🚀 Quick Start

### Prerequisites
- Python 3.12.0
- Node.js 18+ and npm
- Git

### Backend Setup (Django)

```bash
cd sustindex-

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Backend will be available at: http://localhost:8000

### Frontend Setup (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Run development server
npm run dev
```

Frontend will be available at: http://localhost:3000

## 🔑 Default Credentials

- **Username**: admin
- **Password**: admin123

⚠️ Change these credentials in production!

## 📚 API Documentation

Once the backend is running, access the API documentation at:
- Swagger UI: http://localhost:8000/api/v1/swagger/
- ReDoc: http://localhost:8000/api/v1/redoc/

## 🎨 Key Technologies

### Backend
- Django 4.2
- Django REST Framework
- JWT Authentication
- SQLite (development) / PostgreSQL (production)
- CKEditor for rich text
- CORS Headers

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- Font Awesome icons

## 📊 Assessment Flow

1. **User Registration/Login**: Secure authentication
2. **Survey Selection**: Choose from available assessments
3. **Questionnaire**: Answer questions with multiple choice support
4. **Document Upload**: Attach supporting evidence
5. **Add Notes**: Provide additional context
6. **Submit**: Complete assessment
7. **Results**: View scores, grades, and recommendations
8. **History**: Track progress over time

## 🎯 Scoring System

- **Environmental Score**: 0-100
- **Social Score**: 0-100
- **Governance Score**: 0-100
- **Overall Grade**: A+ to D based on total score

### Grade Thresholds
- A+: 80-100
- A: 70-79
- B+: 60-69
- B: 50-59
- C+: 40-49
- C: 30-39
- D: 0-29

## 🔧 Configuration

### Backend Environment Variables
Create `sustindex-/.env` (see `sustindex-/.env.example`):
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3

# For production with PostgreSQL:
# DATABASE_URL=postgresql://user:password@host:port/dbname
```

### Frontend Environment Variables
Create `frontend/.env.local` (see `frontend/.env.local.example`):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000

# For production:
# NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🌐 Deployment

### Backend (Render.com)
The application is configured for deployment on Render.com:
- `render.yaml`: Service configuration
- `build.sh`: Build script
- `runtime.txt`: Python version

Live Demo: https://sustindex.onrender.com

### Frontend (Vercel)
Deploy to Vercel with one click:
```bash
cd frontend
vercel
```

## 📖 Documentation

### Core Documentation
- [Architecture Overview](ARCHITECTURE.md) - System design and technology stack
- [Database Schema](DATABASE_SCHEMA.md) - Complete database documentation
- [API Documentation](sustindex-/API_DOCUMENTATION.md) - REST API endpoints
- [Deployment Guide](sustindex-/DEPLOYMENT.md) - Production deployment

### Setup Guides
- [Backend Setup](sustindex-/README.md) - Django backend setup
- [Frontend Setup](frontend/README.md) - Next.js frontend setup
- [GitHub Setup](GITHUB_SETUP.md) - Repository setup guide

### Feature Documentation
- [Questions Management](sustindex-/QUESTIONS_MANAGEMENT.md) - Managing survey questions
- [Testing Guide](TESTING_GUIDE.md) - Testing procedures

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](sustindex-/LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Django and Next.js
- Icons by Font Awesome
- Styling with Tailwind CSS

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for a sustainable future
