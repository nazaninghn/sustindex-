# Sustindex REST API Documentation

## Base URL
- Development: `http://localhost:8000/api/v1/`
- Production: `https://sustindex.onrender.com/api/v1/`

## Authentication

The API uses JWT (JSON Web Token) authentication.

### Get Access Token
```bash
POST /api/v1/auth/token/
Content-Type: application/json

{
  "username": "your_username",
  "password": "your_password"
}
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Refresh Token
```bash
POST /api/v1/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "your_refresh_token"
}
```

### Using Token
Include the access token in the Authorization header:
```
Authorization: Bearer your_access_token
```

## API Endpoints

### Users
- `GET /api/v1/users/` - List users (admin only)
- `GET /api/v1/users/me/` - Get current user info
- `POST /api/v1/users/register/` - Register new user
- `GET /api/v1/users/{id}/` - Get user details
- `PUT /api/v1/users/{id}/` - Update user
- `DELETE /api/v1/users/{id}/` - Delete user

### Company Profiles
- `GET /api/v1/company-profiles/` - List company profiles
- `POST /api/v1/company-profiles/` - Create company profile
- `GET /api/v1/company-profiles/{id}/` - Get profile details
- `PUT /api/v1/company-profiles/{id}/` - Update profile
- `DELETE /api/v1/company-profiles/{id}/` - Delete profile

### Surveys
- `GET /api/v1/surveys/` - List all active surveys
- `GET /api/v1/surveys/{id}/` - Get survey details
- `GET /api/v1/surveys/{id}/questions/` - Get survey questions
- `GET /api/v1/surveys/{id}/sessions/` - Get survey sessions

### Survey Sessions
- `GET /api/v1/survey-sessions/` - List all sessions
- `GET /api/v1/survey-sessions/open_sessions/` - Get currently open sessions
- `GET /api/v1/survey-sessions/{id}/` - Get session details

### Categories
- `GET /api/v1/categories/` - List all categories
- `GET /api/v1/categories/{id}/` - Get category details with questions

### Questions
- `GET /api/v1/questions/` - List all questions
- `GET /api/v1/questions/?survey={id}` - Filter by survey
- `GET /api/v1/questions/?category={id}` - Filter by category
- `GET /api/v1/questions/{id}/` - Get question details

### Questionnaire Attempts
- `GET /api/v1/attempts/` - List user's attempts
- `POST /api/v1/attempts/` - Start new attempt
- `GET /api/v1/attempts/{id}/` - Get attempt details
- `POST /api/v1/attempts/{id}/complete/` - Complete attempt and calculate scores
- `GET /api/v1/attempts/{id}/results/` - Get attempt results
- `GET /api/v1/attempts/my_attempts/` - Get current user's attempts

### Answers
- `GET /api/v1/answers/` - List user's answers
- `POST /api/v1/answers/` - Submit answer
- `GET /api/v1/answers/{id}/` - Get answer details
- `PUT /api/v1/answers/{id}/` - Update answer
- `DELETE /api/v1/answers/{id}/` - Delete answer

### Documents
- `GET /api/v1/documents/` - List user's documents
- `POST /api/v1/documents/` - Upload document
- `GET /api/v1/documents/{id}/` - Get document details
- `DELETE /api/v1/documents/{id}/` - Delete document

## Example Workflows

### 1. User Registration
```bash
POST /api/v1/users/register/
{
  "username": "company123",
  "email": "contact@company.com",
  "password": "SecurePass123",
  "password_confirm": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe",
  "company_name": "Example Corp",
  "phone": "+1234567890"
}
```

### 2. Start Questionnaire
```bash
# Get available surveys
GET /api/v1/surveys/

# Get open sessions
GET /api/v1/survey-sessions/open_sessions/

# Start new attempt
POST /api/v1/attempts/
{
  "survey": 1,
  "session": 1
}
```

### 3. Submit Answers
```bash
# For single choice question
POST /api/v1/answers/
{
  "attempt": 1,
  "question": 1,
  "choice": 3
}

# For multiple choice question
POST /api/v1/answers/
{
  "attempt": 1,
  "question": 2,
  "choices_ids": [5, 7, 9]
}
```

### 4. Complete and Get Results
```bash
# Complete attempt
POST /api/v1/attempts/1/complete/

# Get results
GET /api/v1/attempts/1/results/
```

## Interactive API Documentation

Visit `/api/v1/docs/` for interactive Swagger UI documentation where you can test all endpoints.

## CORS Configuration

The API allows requests from:
- `http://localhost:3000` (Next.js development)
- `http://127.0.0.1:3000`

For production, update `CORS_ALLOWED_ORIGINS` in settings.py with your Next.js domain.

## Rate Limiting

Currently no rate limiting is implemented. Consider adding it for production.

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
