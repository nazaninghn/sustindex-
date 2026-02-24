# System Architecture

## Overview

SustIndex is a full-stack sustainability assessment platform built with a decoupled architecture:
- **Backend**: Django REST Framework API
- **Frontend**: Next.js 14 with App Router
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: JWT with refresh tokens

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js 14 Frontend (Port 3000)              │ │
│  │  - React Server Components                             │ │
│  │  - Client Components with hooks                        │ │
│  │  - Tailwind CSS styling                                │ │
│  │  - Axios API client with JWT interceptors              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS/REST API
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         Django REST Framework (Port 8000)              │ │
│  │  - JWT Authentication                                  │ │
│  │  - CORS middleware                                     │ │
│  │  - API versioning (/api/v1/)                          │ │
│  │  - Swagger/OpenAPI documentation                       │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Business Logic Layer                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Accounts   │  │Questionnaire │  │   Reports    │     │
│  │              │  │              │  │              │     │
│  │ - User mgmt  │  │ - Surveys    │  │ - PDF gen    │     │
│  │ - Auth       │  │ - Questions  │  │ - Analytics  │     │
│  │ - Profiles   │  │ - Answers    │  │ - Scoring    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              PostgreSQL Database                        │ │
│  │  - User data                                           │ │
│  │  - Survey definitions                                  │ │
│  │  - Assessment attempts                                 │ │
│  │  - Answers and documents                               │ │
│  │  - ESG scores and grades                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Backend
- **Framework**: Django 4.2
- **API**: Django REST Framework 3.14
- **Authentication**: djangorestframework-simplejwt
- **Database ORM**: Django ORM
- **Rich Text**: django-ckeditor
- **CORS**: django-cors-headers
- **API Docs**: drf-yasg (Swagger/OpenAPI)

### Frontend
- **Framework**: Next.js 14.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **HTTP Client**: Axios 1.6
- **Icons**: Font Awesome 6

### Database
- **Development**: SQLite 3
- **Production**: PostgreSQL 14+

### Deployment
- **Backend**: Render.com
- **Frontend**: Vercel (recommended)
- **Static Files**: Whitenoise

## Data Flow

### Authentication Flow
```
1. User submits credentials → POST /api/v1/auth/login/
2. Backend validates → Returns access + refresh tokens
3. Frontend stores tokens → localStorage
4. Subsequent requests → Include access token in Authorization header
5. Token expires → Auto-refresh using refresh token
6. Refresh fails → Redirect to login
```

### Assessment Flow
```
1. User selects survey → GET /api/v1/surveys/
2. Create attempt → POST /api/v1/attempts/
3. Load questions → GET /api/v1/surveys/{id}/questions/
4. For each question:
   - User selects choices
   - Optionally uploads documents
   - Optionally adds notes
   - Submit answer → POST /api/v1/answers/
5. Complete attempt → POST /api/v1/attempts/{id}/complete/
6. Calculate scores → Backend computes ESG scores
7. View results → GET /api/v1/attempts/{id}/
```

## API Structure

### Endpoints

#### Authentication
- `POST /api/v1/auth/register/` - User registration
- `POST /api/v1/auth/login/` - Login (returns JWT tokens)
- `POST /api/v1/auth/token/refresh/` - Refresh access token
- `GET /api/v1/users/me/` - Get current user profile

#### Surveys & Questions
- `GET /api/v1/surveys/` - List all surveys
- `GET /api/v1/surveys/{id}/` - Survey details
- `GET /api/v1/surveys/{id}/questions/` - Questions for survey

#### Assessments
- `POST /api/v1/attempts/` - Create new attempt
- `GET /api/v1/attempts/{id}/` - Get attempt details
- `POST /api/v1/attempts/{id}/complete/` - Complete attempt
- `GET /api/v1/attempts/my_attempts/` - User's attempts

#### Answers
- `POST /api/v1/answers/` - Submit answer
- `POST /api/v1/documents/` - Upload document

## Database Schema

### Core Models

#### User (Custom)
```python
- id: AutoField
- username: CharField (unique)
- email: EmailField (unique)
- password: CharField (hashed)
- company_name: CharField
- phone: CharField
- membership_type: CharField (free/silver/gold)
- created_at: DateTimeField
```

#### Survey
```python
- id: AutoField
- name: CharField
- description: TextField
- is_active: BooleanField
- allow_multiple_attempts: BooleanField
- show_results_immediately: BooleanField
- created_at: DateTimeField
```

#### Category
```python
- id: AutoField
- name: CharField
- description: TextField
- order: IntegerField
- environmental_weight: FloatField
- social_weight: FloatField
- governance_weight: FloatField
- max_score: IntegerField
```

#### Question
```python
- id: AutoField
- survey: ForeignKey(Survey)
- category: ForeignKey(Category)
- text: RichTextField
- order: IntegerField
- is_active: BooleanField
- allow_multiple: BooleanField
- attachment: FileField
```

#### Choice
```python
- id: AutoField
- question: ForeignKey(Question)
- text: CharField
- score: IntegerField
- order: IntegerField
```

#### QuestionnaireAttempt
```python
- id: AutoField
- user: ForeignKey(User)
- survey: ForeignKey(Survey)
- session: ForeignKey(SurveySession, nullable)
- started_at: DateTimeField
- completed_at: DateTimeField (nullable)
- is_completed: BooleanField
- total_score: IntegerField
- environmental_score: FloatField
- social_score: FloatField
- governance_score: FloatField
- overall_grade: CharField (A+, A, B+, B, C+, C, D)
```

#### Answer
```python
- id: AutoField
- attempt: ForeignKey(QuestionnaireAttempt)
- question: ForeignKey(Question)
- choice: ForeignKey(Choice, nullable) # For single choice
- choices: ManyToManyField(Choice) # For multiple choice
- notes: TextField (nullable)
- answered_at: DateTimeField
```

#### UserDocument
```python
- id: AutoField
- answer: ForeignKey(Answer)
- title: CharField
- description: TextField
- file: FileField
- uploaded_at: DateTimeField
- file_size: IntegerField
```

## Security

### Authentication
- JWT tokens with 60-minute expiration
- Refresh tokens with 7-day expiration
- Secure password hashing (PBKDF2)
- CORS configured for specific origins

### Data Protection
- SQL injection prevention (Django ORM)
- XSS protection (React escaping)
- CSRF tokens for state-changing operations
- File upload validation and size limits

### API Security
- Rate limiting (recommended for production)
- HTTPS only in production
- Secure headers (X-Frame-Options, etc.)

## Scalability Considerations

### Current Architecture
- Monolithic Django backend
- Stateless API (JWT tokens)
- File storage on server filesystem

### Future Improvements
1. **Caching**: Redis for session/query caching
2. **File Storage**: S3/CloudFlare for uploaded files
3. **Database**: Read replicas for scaling reads
4. **CDN**: CloudFlare for static assets
5. **Queue**: Celery for async tasks (PDF generation, emails)
6. **Monitoring**: Sentry for error tracking

## Development Workflow

### Local Setup
```bash
# Backend
cd sustindex-
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
```

### Environment Variables
- Backend: `.env` (see `.env.example`)
- Frontend: `.env.local` (see `.env.local.example`)

### Database Migrations
```bash
# Create migration
python manage.py makemigrations

# Apply migration
python manage.py migrate

# View migration SQL
python manage.py sqlmigrate questionnaire 0001
```

## Deployment

### Backend (Render.com)
- Automatic deploys from main branch
- PostgreSQL database provisioned
- Environment variables configured
- Build command: `./build.sh`
- Start command: `gunicorn sustindex.wsgi`

### Frontend (Vercel)
- Automatic deploys from main branch
- Environment variable: `NEXT_PUBLIC_API_URL`
- Build command: `npm run build`
- Output directory: `.next`

## Monitoring & Logging

### Backend Logs
- Django logs to stdout
- Render.com captures logs
- Error tracking via Django admin

### Frontend Logs
- Browser console for client errors
- Vercel logs for build/runtime errors

## Performance

### Backend Optimizations
- Database query optimization (select_related, prefetch_related)
- Pagination for list endpoints
- Gzip compression for responses

### Frontend Optimizations
- Next.js automatic code splitting
- Image optimization
- Static page generation where possible
- Client-side caching of API responses

## Testing Strategy

### Backend Tests
```bash
python manage.py test
```

### Frontend Tests
```bash
npm run test
```

### Integration Tests
- Manual testing of complete user flows
- API endpoint testing via Swagger UI

## Documentation

- API Documentation: `/api/v1/swagger/`
- Admin Interface: `/admin/`
- This Architecture Doc: `ARCHITECTURE.md`
- Deployment Guide: `sustindex-/DEPLOYMENT.md`
- API Details: `sustindex-/API_DOCUMENTATION.md`
