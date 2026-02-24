# 🚀 Render.com Full-Stack Deployment Guide

## Overview
This guide deploys both Django backend and Next.js frontend on a single Render.com service.

**Architecture:**
```
Render.com Service
├── Django (Backend API)
│   ├── /api/v1/* → REST API
│   └── /admin/ → Django Admin
└── Next.js (Frontend)
    └── /* → Static React App
```

## Prerequisites
- GitHub account
- Render.com account (free tier works)
- Repository pushed to GitHub: `nazaninghn/sustindex-`

## Deployment Steps

### 1. Create Render Account
- Go to: https://render.com
- Sign up with GitHub

### 2. Create PostgreSQL Database

1. **New PostgreSQL**
   - Dashboard → "New +" → "PostgreSQL"
   - Name: `sustindex-db`
   - Database: `sustindex`
   - User: `sustindex`
   - Region: Frankfurt (or closest to you)
   - Plan: Free
   - Click "Create Database"

2. **Wait for Database**
   - Wait 2-3 minutes for database to be ready
   - Status should show "Available"

### 3. Deploy Full-Stack Service

#### Option A: Using render.yaml (Automatic)

1. **New Web Service**
   - Dashboard → "New +" → "Web Service"
   - Connect GitHub repository: `nazaninghn/sustindex-`
   - Click "Connect"

2. **Render will detect `render.yaml`**
   - Click "Apply"
   - Service name: `sustindex-fullstack`
   - All settings are pre-configured!

3. **Deploy**
   - Click "Create Web Service"
   - Wait 10-15 minutes for first build
   - Frontend build takes time (npm install + build)

#### Option B: Manual Configuration

1. **New Web Service**
   - Dashboard → "New +" → "Web Service"
   - Connect repository: `nazaninghn/sustindex-`

2. **Configure Service**
   ```
   Name: sustindex-fullstack
   Region: Frankfurt
   Branch: main
   Root Directory: sustindex-
   Runtime: Python 3
   Build Command: bash build.sh
   Start Command: gunicorn sustindex.wsgi:application --bind 0.0.0.0:$PORT --workers 2
   ```

3. **Environment Variables**
   ```bash
   DATABASE_URL=<from-database-internal-url>
   SECRET_KEY=<generate-random-key>
   DEBUG=False
   DJANGO_SETTINGS_MODULE=sustindex.settings
   WEB_CONCURRENCY=2
   NODE_VERSION=18.17.0
   NEXT_PUBLIC_API_URL=https://sustindex-fullstack.onrender.com/api/v1
   ```

4. **Generate SECRET_KEY**
   ```python
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

### 4. Monitor Build

Watch the build logs:
- Installing Python dependencies (2-3 min)
- Installing Node.js dependencies (3-5 min)
- Building Next.js (2-3 min)
- Collecting static files (1 min)
- Running migrations (1 min)

**Total build time: 10-15 minutes**

### 5. Post-Deployment

#### Create Superuser
Open Shell in Render dashboard:
```bash
python manage.py createsuperuser
```

#### Test Deployment
- Frontend: `https://sustindex-fullstack.onrender.com/`
- API: `https://sustindex-fullstack.onrender.com/api/v1/`
- Admin: `https://sustindex-fullstack.onrender.com/admin/`
- Swagger: `https://sustindex-fullstack.onrender.com/api/v1/swagger/`

## How It Works

### Build Process (build.sh)
```bash
1. Upgrade pip, setuptools, wheel
2. Install Python dependencies from requirements.txt
3. Navigate to frontend directory
4. Install Node.js dependencies (npm install)
5. Build Next.js (npm run build → exports to sustindex-/frontend-build/)
6. Return to sustindex- directory
7. Collect Django static files
8. Run database migrations
9. Compile translations
10. Setup initial data (create admin user if needed)
```

**Note**: The build script runs from `sustindex-` directory (set by `rootDir` in render.yaml), so all paths are relative to that directory.

### URL Routing
```
/ → Next.js Frontend (index.html)
/about → Next.js Frontend
/login → Next.js Frontend
/dashboard → Next.js Frontend
/api/v1/* → Django REST API
/admin/ → Django Admin Panel
/_next/* → Next.js Static Assets
```

### Django Serves Frontend
- Next.js builds to `sustindex-/frontend-build/`
- Django serves these static files
- All routes go to `index.html` (SPA routing)
- API routes are handled by Django

## Advantages

✅ **Single Service**: One URL for everything
✅ **No CORS Issues**: Same origin for frontend/backend
✅ **Simpler Deployment**: One service to manage
✅ **Cost Effective**: Free tier for both
✅ **Easier SSL**: One certificate for all

## Disadvantages

⚠️ **Slower Builds**: Frontend + Backend together
⚠️ **Cold Starts**: Affects both frontend and backend
⚠️ **Less Scalable**: Can't scale frontend/backend separately

## Troubleshooting

### Build Fails at npm install
```bash
# Check Node version in Render Shell
echo $NODE_VERSION

# Should be 18.17.0 or higher
# If not set, add NODE_VERSION=18.17.0 to environment variables
```

### Build Fails at requirements.txt
```bash
# Error: "Could not open requirements file"
# This means the build script is running from wrong directory

# Solution: Ensure render.yaml has:
rootDir: sustindex-

# And build.sh does NOT have "cd sustindex-" before pip install
```

### Build Fails at Next.js build
```bash
# Check frontend locally
cd frontend
npm install
npm run build
```

### Frontend Shows 404
```bash
# Check if frontend-build exists
ls -la sustindex-/frontend-build/

# Should contain index.html and _next/
```

### API Not Working
```bash
# Check Django is running
curl https://sustindex-fullstack.onrender.com/api/v1/

# Check logs in Render dashboard
```

### Static Files Not Loading
```bash
# In Render Shell
python manage.py collectstatic --noinput
ls -la staticfiles/
```

## Updating Deployment

### Push to GitHub
```bash
git add -A
git commit -m "Update application"
git push origin main
```

Render automatically rebuilds and deploys!

### Manual Redeploy
- Dashboard → Your Service
- Click "Manual Deploy" → "Deploy latest commit"

## Custom Domain

1. **Add Domain**
   - Service Settings → "Custom Domain"
   - Add your domain: `yourdomain.com`

2. **Update DNS**
   - Add CNAME record: `yourdomain.com` → `sustindex-fullstack.onrender.com`

3. **Update Settings**
   ```python
   ALLOWED_HOSTS = [
       '.onrender.com',
       'yourdomain.com',
       'www.yourdomain.com',
   ]
   ```

4. **Update Environment Variable**
   ```
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api/v1
   ```

5. **Redeploy**

## Monitoring

### Logs
- Real-time logs in dashboard
- Filter by severity
- Search logs

### Metrics
- CPU usage
- Memory usage
- Request count
- Response times

### Health Checks
- Automatic health monitoring
- Email alerts on failures
- Auto-restart on crashes

## Free Tier Limitations

- **Service**: Spins down after 15 minutes of inactivity
- **Database**: 90 days retention, 1GB storage
- **Bandwidth**: 100GB/month
- **Build Minutes**: 500 minutes/month

**Note**: First request after spin-down takes 30-60 seconds.

## Upgrade for Production

Consider upgrading for:
- No spin-down (always available)
- Better performance
- More resources
- Priority support

**Starter Plan**: $7/month
**Standard Plan**: $25/month

## Support

- Render Docs: https://render.com/docs
- Django Docs: https://docs.djangoproject.com
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: https://github.com/nazaninghn/sustindex-/issues

---

**Success Checklist:**
- ✅ Database created and available
- ✅ Service deployed successfully
- ✅ Frontend loads at root URL
- ✅ API responds at /api/v1/
- ✅ Admin panel accessible
- ✅ Superuser created
- ✅ No errors in logs

**Your full-stack app is now live!** 🎉
