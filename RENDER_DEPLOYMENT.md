# 🚀 Render.com Backend Deployment Guide

## Prerequisites
- GitHub account
- Render.com account (free tier works)
- Repository pushed to GitHub

## Deployment Steps

### 1. Create Render Account
- Go to: https://render.com
- Sign up with GitHub

### 2. Create PostgreSQL Database

1. **New PostgreSQL**
   - Dashboard → "New +" → "PostgreSQL"
   - Name: `sustindex-db`
   - Database: `sustindex`
   - User: `sustindex_user`
   - Region: Choose closest to you
   - Plan: Free
   - Click "Create Database"

2. **Copy Connection Details**
   - Wait for database to be ready
   - Copy "Internal Database URL" (starts with `postgresql://`)

### 3. Create Web Service

1. **New Web Service**
   - Dashboard → "New +" → "Web Service"
   - Connect your GitHub repository: `nazaninghn/sustindex-`
   - Click "Connect"

2. **Configure Service**
   ```
   Name: sustindex-backend
   Region: Same as database
   Branch: main
   Root Directory: sustindex-
   Runtime: Python 3
   Build Command: ./build.sh
   Start Command: gunicorn sustindex.wsgi:application
   ```

3. **Environment Variables**
   Add these in Render dashboard:
   
   ```bash
   # Required
   PYTHON_VERSION=3.12.0
   DATABASE_URL=<paste-internal-database-url>
   SECRET_KEY=<generate-random-secret-key>
   
   # Django Settings
   DEBUG=False
   ALLOWED_HOSTS=.onrender.com
   
   # CORS (for frontend)
   CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   ```

4. **Generate SECRET_KEY**
   ```python
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deploy
   - Your API will be live at: `https://sustindex-backend.onrender.com`

### 4. Run Migrations

After first deploy, open Shell in Render dashboard:

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic --noinput
```

### 5. Update Frontend

Update Vercel environment variable:
```
NEXT_PUBLIC_API_URL=https://sustindex-backend.onrender.com/api/v1
```

Redeploy frontend for changes to take effect.

## Configuration Files

### render.yaml
```yaml
databases:
  - name: sustindex-db
    databaseName: sustindex
    user: sustindex_user
    plan: free

services:
  - type: web
    name: sustindex-backend
    runtime: python
    buildCommand: "./build.sh"
    startCommand: "gunicorn sustindex.wsgi:application"
    envVars:
      - key: PYTHON_VERSION
        value: 3.12.0
      - key: DATABASE_URL
        fromDatabase:
          name: sustindex-db
          property: connectionString
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: False
```

### build.sh
```bash
#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
```

## Post-Deployment

### Custom Domain (Optional)
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

### CORS Configuration
Update `sustindex-/sustindex/settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-vercel-app.vercel.app",
    "http://localhost:3000",  # for local development
]
```

### Automatic Deployments
- Every push to `main` branch triggers automatic deployment
- Manual deploy: Dashboard → "Manual Deploy" → "Deploy latest commit"

## Troubleshooting

### Build Fails
```bash
# Check build.sh locally
cd sustindex-
chmod +x build.sh
./build.sh
```

### Database Connection Issues
- Verify DATABASE_URL is set correctly
- Check database is in same region as web service
- Use Internal Database URL (not External)

### Static Files Not Loading
```bash
# In Render Shell
python manage.py collectstatic --noinput
```

### CORS Errors
- Add frontend URL to CORS_ALLOWED_ORIGINS
- Redeploy backend after changes

## Monitoring

### Logs
- Dashboard → Your Service → Logs
- Real-time log streaming
- Filter by severity

### Metrics
- Dashboard → Your Service → Metrics
- CPU, Memory, Request count
- Response times

### Health Checks
Render automatically monitors:
- HTTP endpoint: `/admin/` (returns 200)
- Restart on failure

## Free Tier Limitations

- **Web Service**: Spins down after 15 minutes of inactivity
- **Database**: 90 days retention, 1GB storage
- **Bandwidth**: 100GB/month
- **Build Minutes**: 500 minutes/month

**Note**: First request after spin-down takes 30-60 seconds.

## Upgrade Options

For production use, consider:
- **Starter Plan** ($7/month): No spin-down, better performance
- **Standard Plan** ($25/month): More resources, priority support

## Useful Commands

### Render CLI
```bash
# Install
npm install -g render-cli

# Login
render login

# Deploy
render deploy

# View logs
render logs

# Run command
render run python manage.py migrate
```

### Django Management
```bash
# In Render Shell
python manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic
python manage.py shell
```

## Support

- Render Docs: https://render.com/docs
- Django Docs: https://docs.djangoproject.com
- GitHub Issues: https://github.com/nazaninghn/sustindex-/issues

---

**Security Checklist:**
- ✅ DEBUG=False in production
- ✅ Strong SECRET_KEY
- ✅ ALLOWED_HOSTS configured
- ✅ CORS_ALLOWED_ORIGINS set
- ✅ Database backups enabled
- ✅ HTTPS enforced (automatic on Render)
