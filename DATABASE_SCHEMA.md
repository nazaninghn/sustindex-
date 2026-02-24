# Database Schema Documentation

## Overview

SustIndex uses a relational database (PostgreSQL in production, SQLite in development) with the following main entities:

- Users and Authentication
- Surveys and Sessions
- Questions and Choices
- Assessment Attempts
- Answers and Documents
- Categories and Scoring

## Entity Relationship Diagram

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │
       │ 1:N
       ▼
┌──────────────────────┐
│ QuestionnaireAttempt │◄─────┐
└──────┬───────────────┘      │
       │                      │ 1:1
       │ 1:N                  │
       ▼                      │
┌─────────────┐         ┌─────────┐
│   Answer    │         │ Report  │
└──────┬──────┘         └─────────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│UserDocument  │
└──────────────┘

┌─────────────┐
│   Survey    │
└──────┬──────┘
       │
       │ 1:N
       ▼
┌─────────────┐      ┌──────────────┐
│  Question   │──────│  Category    │
└──────┬──────┘ N:1  └──────────────┘
       │
       │ 1:N
       ▼
┌─────────────┐
│   Choice    │
└─────────────┘
```

## Tables

### accounts_user

Custom user model extending Django's AbstractUser.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Auto-incrementing ID |
| username | VARCHAR(150) | UNIQUE, NOT NULL | Username for login |
| email | VARCHAR(254) | UNIQUE, NOT NULL | User email |
| password | VARCHAR(128) | NOT NULL | Hashed password |
| first_name | VARCHAR(150) | | User first name |
| last_name | VARCHAR(150) | | User last name |
| is_active | BOOLEAN | DEFAULT TRUE | Account active status |
| is_staff | BOOLEAN | DEFAULT FALSE | Staff access |
| is_superuser | BOOLEAN | DEFAULT FALSE | Admin access |
| date_joined | DATETIME | NOT NULL | Registration date |
| company_name | VARCHAR(200) | | Company name |
| phone | VARCHAR(20) | | Phone number |
| membership_type | VARCHAR(10) | DEFAULT 'free' | Membership tier |
| created_at | DATETIME | AUTO | Account creation |

**Indexes:**
- `username` (UNIQUE)
- `email` (UNIQUE)

### questionnaire_survey

Survey definitions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Survey ID |
| name | VARCHAR(200) | NOT NULL | Survey name |
| description | TEXT | | Survey description |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| allow_multiple_attempts | BOOLEAN | DEFAULT FALSE | Allow retakes |
| show_results_immediately | BOOLEAN | DEFAULT TRUE | Show results after completion |
| created_at | DATETIME | AUTO | Creation timestamp |
| updated_at | DATETIME | AUTO | Last update timestamp |

**Indexes:**
- `is_active`
- `created_at`

### questionnaire_surveysession

Time-bound assessment sessions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Session ID |
| survey_id | INTEGER | FK(Survey) | Related survey |
| name | VARCHAR(200) | NOT NULL | Session name |
| description | TEXT | | Session description |
| start_date | DATETIME | NOT NULL | Session start |
| end_date | DATETIME | NOT NULL | Session end |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| created_at | DATETIME | AUTO | Creation timestamp |

**Indexes:**
- `survey_id`
- `start_date`, `end_date`
- `is_active`

### questionnaire_category

Question categories for ESG scoring.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Category ID |
| name | VARCHAR(200) | NOT NULL | Category name |
| description | TEXT | | Category description |
| order | INTEGER | DEFAULT 0 | Display order |
| environmental_weight | FLOAT | DEFAULT 0.0 | E score weight |
| social_weight | FLOAT | DEFAULT 0.0 | S score weight |
| governance_weight | FLOAT | DEFAULT 0.0 | G score weight |
| max_score | INTEGER | DEFAULT 100 | Maximum score |

**Indexes:**
- `order`

### questionnaire_question

Survey questions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Question ID |
| survey_id | INTEGER | FK(Survey), NULL | Related survey |
| category_id | INTEGER | FK(Category) | Question category |
| text | TEXT | NOT NULL | Question text (HTML) |
| order | INTEGER | DEFAULT 0 | Display order |
| is_active | BOOLEAN | DEFAULT TRUE | Active status |
| allow_multiple | BOOLEAN | DEFAULT FALSE | Allow multiple choices |
| attachment | VARCHAR(100) | | File attachment path |
| created_at | DATETIME | AUTO | Creation timestamp |

**Indexes:**
- `survey_id`
- `category_id`
- `order`
- `is_active`

### questionnaire_choice

Answer choices for questions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Choice ID |
| question_id | INTEGER | FK(Question) | Related question |
| text | VARCHAR(500) | NOT NULL | Choice text |
| score | INTEGER | DEFAULT 0 | Points for this choice |
| order | INTEGER | DEFAULT 0 | Display order |

**Indexes:**
- `question_id`
- `order`

### questionnaire_questionnaireattempt

User assessment attempts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Attempt ID |
| user_id | INTEGER | FK(User) | User who took assessment |
| survey_id | INTEGER | FK(Survey), NULL | Related survey |
| session_id | INTEGER | FK(SurveySession), NULL | Related session |
| started_at | DATETIME | AUTO | Start timestamp |
| completed_at | DATETIME | NULL | Completion timestamp |
| is_completed | BOOLEAN | DEFAULT FALSE | Completion status |
| total_score | INTEGER | DEFAULT 0 | Total score |
| environmental_score | FLOAT | DEFAULT 0.0 | E score (0-100) |
| social_score | FLOAT | DEFAULT 0.0 | S score (0-100) |
| governance_score | FLOAT | DEFAULT 0.0 | G score (0-100) |
| overall_grade | VARCHAR(2) | | Grade (A+, A, B+, B, C+, C, D) |

**Indexes:**
- `user_id`
- `survey_id`
- `session_id`
- `is_completed`
- `started_at`

**Unique Constraints:**
- None (users can have multiple attempts)

### questionnaire_answer

User answers to questions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Answer ID |
| attempt_id | INTEGER | FK(QuestionnaireAttempt) | Related attempt |
| question_id | INTEGER | FK(Question) | Related question |
| choice_id | INTEGER | FK(Choice), NULL | Single choice answer |
| notes | TEXT | NULL | Additional notes/comments |
| answered_at | DATETIME | AUTO | Answer timestamp |

**Indexes:**
- `attempt_id`
- `question_id`
- `choice_id`

**Unique Constraints:**
- `(attempt_id, question_id)` - One answer per question per attempt

### questionnaire_answer_choices

Many-to-many relationship for multiple choice answers.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Relation ID |
| answer_id | INTEGER | FK(Answer) | Related answer |
| choice_id | INTEGER | FK(Choice) | Selected choice |

**Indexes:**
- `answer_id`
- `choice_id`

**Unique Constraints:**
- `(answer_id, choice_id)` - No duplicate selections

### questionnaire_userdocument

User-uploaded supporting documents.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Document ID |
| answer_id | INTEGER | FK(Answer) | Related answer |
| title | VARCHAR(200) | NOT NULL | Document title |
| description | TEXT | | Document description |
| file | VARCHAR(100) | NOT NULL | File path |
| uploaded_at | DATETIME | AUTO | Upload timestamp |
| file_size | INTEGER | DEFAULT 0 | File size in bytes |

**Indexes:**
- `answer_id`
- `uploaded_at`

### reports_report

Generated assessment reports.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Report ID |
| attempt_id | INTEGER | FK(QuestionnaireAttempt), UNIQUE | Related attempt |
| generated_at | DATETIME | AUTO | Generation timestamp |
| pdf_file | VARCHAR(100) | | PDF file path |

**Indexes:**
- `attempt_id` (UNIQUE)
- `generated_at`

### reports_reportsection

Report content sections.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY | Section ID |
| report_id | INTEGER | FK(Report) | Related report |
| title | VARCHAR(200) | NOT NULL | Section title |
| content | TEXT | NOT NULL | Section content |
| order | INTEGER | DEFAULT 0 | Display order |

**Indexes:**
- `report_id`
- `order`

## Scoring Algorithm

### ESG Score Calculation

For each category:
```
category_score = (user_score / max_possible_score) * 100
```

For each ESG dimension:
```
E_score = Σ(category_score × category.environmental_weight)
S_score = Σ(category_score × category.social_weight)
G_score = Σ(category_score × category.governance_weight)
```

Total score:
```
total_score = (E_score + S_score + G_score) / 3
```

### Grade Assignment

| Score Range | Grade |
|-------------|-------|
| 80-100 | A+ |
| 70-79 | A |
| 60-69 | B+ |
| 50-59 | B |
| 40-49 | C+ |
| 30-39 | C |
| 0-29 | D |

## Migrations

All migrations are located in `sustindex-/*/migrations/` directories.

### Key Migrations

1. **0001_initial.py** - Initial schema creation
2. **0006_answer_choices_question_allow_multiple_and_more.py** - Multiple choice support
3. **0007_surveysession_questionnaireattempt_session.py** - Session support
4. **0008_survey_alter_question_options_question_survey_and_more.py** - Survey-question relationship
5. **0009_rename_esg_grade_to_overall_grade.py** - Grade field rename
6. **0010_answer_notes_userdocument_description.py** - Notes and document descriptions

### Running Migrations

```bash
# Apply all migrations
python manage.py migrate

# Create new migration
python manage.py makemigrations

# View migration SQL
python manage.py sqlmigrate questionnaire 0001

# Show migration status
python manage.py showmigrations
```

## Data Integrity

### Foreign Key Constraints
- All foreign keys use `CASCADE` delete (except where noted)
- Nullable foreign keys allow for flexible data modeling

### Unique Constraints
- User: username, email
- Answer: (attempt_id, question_id)
- Report: attempt_id

### Check Constraints
- Scores: 0 ≤ score ≤ 100
- Dates: end_date > start_date (for sessions)

## Performance Considerations

### Indexes
- All foreign keys are indexed
- Frequently queried fields (is_active, created_at) are indexed
- Composite indexes for common query patterns

### Query Optimization
- Use `select_related()` for foreign key lookups
- Use `prefetch_related()` for many-to-many relationships
- Pagination for large result sets

### Example Optimized Queries

```python
# Get attempt with all related data
attempt = QuestionnaireAttempt.objects.select_related(
    'user', 'survey', 'session'
).prefetch_related(
    'answers__question__choices',
    'answers__choices',
    'answers__documents'
).get(id=attempt_id)

# Get user's attempts with scores
attempts = QuestionnaireAttempt.objects.filter(
    user=user,
    is_completed=True
).select_related('survey').order_by('-completed_at')
```

## Backup & Recovery

### Backup Strategy
```bash
# PostgreSQL backup
pg_dump dbname > backup.sql

# SQLite backup
sqlite3 db.sqlite3 ".backup backup.db"
```

### Restore
```bash
# PostgreSQL restore
psql dbname < backup.sql

# SQLite restore
cp backup.db db.sqlite3
```

## Security

### Sensitive Data
- Passwords: Hashed using PBKDF2
- JWT tokens: Not stored in database
- File uploads: Validated and size-limited

### Access Control
- Row-level security via Django ORM filters
- User can only access their own attempts
- Admin users can access all data
