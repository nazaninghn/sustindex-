# Deployment Checklist

## Pre-Deployment Verification

### 1. Files Check
- ✅ `sustindex-/build.sh` - Build script (no `cd sustindex-` before pip install)
- ✅ `sustindex-/render.yaml` - Render configuration (rootDir: sustindex-)
- ✅ `sustindex-/requirements.txt` - Python dependencies (multi-line)
- ✅ `sustindex-/.env.example` - Environment variables template
- ✅ `frontend/.env.local.example` - Frontend environment template
- ✅ `frontend/next.config.js` - Next.js export configuration
- ✅ `sustindex-/manage.py` - Django management script

### 2. Configuration Check
```bash
# Verify render.yaml
cat sustindex-/render.yaml | grep "rootDir"
# Should show: rootDir: sustindex-

# Verify build.sh doesn't have extra cd
cat sustindex-/build.sh | grep "cd sustindex-"
# Should NOT appear before pip install

# Verify Next.js export config
cat frontend/next.config.js | grep "output"
# Should show: output: 'export'

# Verify Next.js distDir
cat frontend/next.config.js | grep "distDir"
# Should show: distDir: '../sustindex-/frontend-build'
```

### 3. Local Testing (Optional)
```bash
# Test backend
cd sustindex-
python manage.py runserver

# Test frontend (separate terminal)
cd frontend
npm install
npm run dev

# Test frontend build
npm run build
# Should create ../sustindex-/frontend-build/ directory
```

## Deployment Steps

### 1. Push to GitHub
```bash
git add -A
git commit -m "Fix build script for Render deployment"
git push origin main
```

### 2. Deploy on Render

#### Option A: Using render.yaml (Recommended)
1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect repository: `nazaninghn/sustindex-`
4. Render detects `render.yaml` → Click "Apply"
5. Click "Create Web Service"
6. Wait 10-15 minutes for build

#### Option B: Manual Configuration
1. Go to https://render.com/dashboard
2. Click "New +" → "PostgreSQL" first
   - Name: `sustindex-db`
   - Create and wait for "Available" status
3. Click "New +" → "Web Service"
4. Connect repository: `nazaninghn/sustindex-`
5. Configure:
   - Name: `sustindex-fullstack`
   - Region: Frankfurt
   - Root Directory: `sustindex-`
   - Runtime: Python 3
   - Build Command: `bash build.sh`
   - Start Command: `gunicorn sustindex.wsgi:application --bind 0.0.0.0:$PORT --workers 2`
6. Add Environment Variables:
   - `DATABASE_URL` (from database)
   - `SECRET_KEY` (generate)
   - `DEBUG=False`
   - `NODE_VERSION=18.17.0`
   - `NEXT_PUBLIC_API_URL=https://sustindex-fullstack.onrender.com/api/v1`
7. Click "Create Web Service"

### 3. Monitor Build
Watch for these stages in logs:
1. ✅ Python version check
2. ✅ Upgrading pip
3. ✅ Installing Python dependencies (2-3 min)
4. ✅ Building Next.js frontend (5-7 min)
5. ✅ Collecting static files
6. ✅ Running migrations
7. ✅ Compiling translations
8. ✅ Setting up initial data
9. ✅ Build completed!

**Expected build time: 10-15 minutes**

## Post-Deployment Verification

### 1. Check Service Status
- Dashboard → Your Service
- Status should be "Live" (green)
- URL: `https://sustindex-fullstack.onrender.com`

### 2. Test Endpoints

#### Frontend
```bash
# Home page
curl https://sustindex-fullstack.onrender.com/

# Should return HTML with Next.js content
```

#### API
```bash
# API root
curl https://sustindex-fullstack.onrender.com/api/v1/

# Swagger docs
curl https://sustindex-fullstack.onrender.com/api/v1/swagger/

# Health check
curl https://sustindex-fullstack.onrender.com/api/v1/health/
```

#### Admin
```bash
# Admin login page
curl https://sustindex-fullstack.onrender.com/admin/

# Should return Django admin HTML
```

### 3. Create Superuser
```bash
# In Render Shell (Dashboard → Shell tab)
python manage.py createsuperuser

# Enter:
# Username: admin
# Email: admin@example.com
# Password: (your secure password)
```

### 4. Test in Browser
1. **Frontend**: https://sustindex-fullstack.onrender.com/
   - ✅ Home page loads
   - ✅ Language switcher works (EN/TR)
   - ✅ Navigation works
   - ✅ Responsive design

2. **API Docs**: https://sustindex-fullstack.onrender.com/api/v1/swagger/
   - ✅ Swagger UI loads
   - ✅ All endpoints listed
   - ✅ Can test endpoints

3. **Admin**: https://sustindex-fullstack.onrender.com/admin/
   - ✅ Login page loads
   - ✅ Can login with superuser
   - ✅ Dashboard accessible

## Troubleshooting

### Build Fails: "Could not open requirements file"
**Problem**: Build script trying to access wrong path

**Solution**: 
- Verify `render.yaml` has `rootDir: sustindex-`
- Verify `build.sh` does NOT have `cd sustindex-` before `pip install`
- The script should run: `pip install -r requirements.txt` directly

### Build Fails: "npm: command not found"
**Problem**: Node.js not installed

**Solution**: Add environment variable `NODE_VERSION=18.17.0`

### Build Fails: Next.js build errors
**Problem**: Frontend dependencies or configuration issue

**Solution**:
```bash
# Test locally first
cd frontend
npm install
npm run build

# Check if frontend-build directory is created
ls -la ../sustindex-/frontend-build/
```

### Frontend Shows 404
**Problem**: Django not serving frontend files

**Solution**:
- Check `sustindex-/frontend-build/` exists
- Check `sustindex-/sustindex/settings.py` has `FRONTEND_BUILD_DIR`
- Check `sustindex-/sustindex/urls.py` has frontend serving routes

### API Returns 500 Error
**Problem**: Database not connected or migrations not run

**Solution**:
```bash
# In Render Shell
python manage.py migrate
python manage.py check
```

### Cold Start (First Request Slow)
**Problem**: Free tier spins down after 15 minutes

**Solution**: This is normal. First request takes 30-60 seconds.

## Success Criteria

- ✅ Service status: "Live"
- ✅ Frontend loads at root URL
- ✅ API responds at /api/v1/
- ✅ Swagger docs accessible
- ✅ Admin panel accessible
- ✅ Superuser can login
- ✅ Language switcher works
- ✅ No errors in logs
- ✅ Database connected
- ✅ Static files loading

## Next Steps

1. **Custom Domain** (Optional)
   - Add domain in Render settings
   - Update DNS records
   - Update `ALLOWED_HOSTS` in settings
   - Update `NEXT_PUBLIC_API_URL`

2. **Monitoring**
   - Set up email alerts
   - Monitor logs regularly
   - Check metrics (CPU, memory)

3. **Backup**
   - Database backups (manual on free tier)
   - Code in GitHub (already done)

4. **Upgrade** (When needed)
   - Starter plan: $7/month (no spin-down)
   - Standard plan: $25/month (better performance)

---

**Deployment Complete!** 🎉

Your full-stack sustainability assessment application is now live on Render.com.
