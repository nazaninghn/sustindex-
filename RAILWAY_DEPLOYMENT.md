# 🚂 Railway Backend Deployment Guide

## Why Railway?
- Faster cold starts than Render
- Better free tier (500 hours/month)
- Simpler setup
- Built-in PostgreSQL

## Prerequisites
- GitHub account
- Railway account
- Repository pushed to GitHub

## Deployment Steps

### 1. Create Railway Account
- Go to: https://railway.app
- Sign up with GitHub

### 2. Create New Project

1. **New Project**
   - Dashboard → "New Project"
   - Select "Deploy from GitHub repo"
   - Choose: `nazaninghn/sustindex-`

2. **Add PostgreSQL**
   - Click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically creates and links database

### 3. Configure Django Service

1. **Settings**
   - Click on your Django service
   - Go to "Settings"

2. **Root Directory**
   ```
   Root Directory: sustindex-
   ```

3. **Build Command**
   ```bash
   pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
   ```

4. **Start Command**
   ```bash
   gunicorn sustindex.wsgi:application --bind 0.0.0.0:$PORT
   ```

### 4. Environment Variables

Railway auto-generates `DATABASE_URL`. Add these:

```bash
# Django Settings
SECRET_KEY=<generate-random-secret-key>
DEBUG=False
ALLOWED_HOSTS=.railway.app
RAILWAY_ENVIRONMENT=production

# CORS
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:3000

# Python
PYTHON_VERSION=3.12.0
```

**Generate SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 5. Deploy

- Railway automatically deploys
- Wait 3-5 minutes
- Your API will be live at: `https://your-app.railway.app`

### 6. Run Initial Setup

Open Railway Shell (click service → "Shell"):

```bash
python manage.py createsuperuser
```

### 7. Update Frontend

Update Vercel environment variable:
```
NEXT_PUBLIC_API_URL=https://your-app.railway.app/api/v1
```

## Railway Configuration File

Create `railway.json` in `sustindex-/`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate"
  },
  "deploy": {
    "startCommand": "gunicorn sustindex.wsgi:application --bind 0.0.0.0:$PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Settings.py Updates

Update `sustindex-/sustindex/settings.py`:

```python
import os
import dj_database_url

# Railway-specific settings
if os.environ.get('RAILWAY_ENVIRONMENT'):
    DEBUG = False
    
    # Database
    DATABASES = {
        'default': dj_database_url.config(
            default=os.environ.get('DATABASE_URL'),
            conn_max_age=600
        )
    }
    
    # Security
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    
    # Static files
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

## Custom Domain

1. **Add Domain**
   - Service Settings → "Domains"
   - Click "Generate Domain" or "Custom Domain"

2. **Update DNS**
   - Add CNAME record pointing to Railway domain
   - Wait for DNS propagation (5-30 minutes)

3. **Update Settings**
   ```python
   ALLOWED_HOSTS = [
       '.railway.app',
       'yourdomain.com',
       'www.yourdomain.com',
   ]
   ```

## Monitoring

### Logs
- Click service → "Logs"
- Real-time streaming
- Filter by severity

### Metrics
- Click service → "Metrics"
- CPU, Memory, Network usage
- Request/response times

### Deployments
- Click service → "Deployments"
- View all deployments
- Rollback to previous version

## Free Tier

- **Execution Time**: 500 hours/month
- **Database**: 1GB storage
- **Bandwidth**: Unlimited
- **Deployments**: Unlimited

**Note**: No cold starts! Services stay warm.

## Advantages over Render

✅ **No Cold Starts**: Services don't spin down
✅ **Faster Builds**: Nixpacks is faster than Docker
✅ **Better Free Tier**: 500 hours vs 750 hours on Render
✅ **Simpler Setup**: Less configuration needed
✅ **Built-in Monitoring**: Better metrics and logs

## Troubleshooting

### Build Fails
```bash
# Check locally
cd sustindex-
pip install -r requirements.txt
python manage.py check
```

### Database Connection
```bash
# In Railway Shell
echo $DATABASE_URL
python manage.py dbshell
```

### Static Files
```bash
# In Railway Shell
python manage.py collectstatic --noinput
ls staticfiles/
```

### CORS Issues
- Add frontend URL to CORS_ALLOWED_ORIGINS
- Redeploy service

## CLI Usage

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up

# View logs
railway logs

# Run command
railway run python manage.py migrate

# Open shell
railway shell
```

## Backup Database

```bash
# Export
railway run pg_dump $DATABASE_URL > backup.sql

# Import
railway run psql $DATABASE_URL < backup.sql
```

## Support

- Railway Docs: https://docs.railway.app
- Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/nazaninghn/sustindex-/issues

---

**Comparison: Railway vs Render**

| Feature | Railway | Render |
|---------|---------|--------|
| Cold Starts | ❌ None | ✅ Yes (15 min) |
| Free Hours | 500/month | Always on |
| Build Speed | ⚡ Fast | 🐢 Slower |
| Setup | 🎯 Simple | 📝 More config |
| Database | ✅ Included | ✅ Included |
| Custom Domain | ✅ Free | ✅ Free |

**Recommendation**: Use Railway for better performance and simpler setup!
