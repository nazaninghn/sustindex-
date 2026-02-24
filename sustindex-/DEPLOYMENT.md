# 🚀 Deployment Guide for Render.com

## Prerequisites
- GitHub account
- Render.com account (free tier available)
- Your Django project pushed to GitHub

## Step-by-Step Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/sustindex.git
git push -u origin main
```

### 2. Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your `sustindex` repository

### 3. Configure Service Settings

**Basic Settings:**
- **Name**: `sustindex` (or your preferred name)
- **Environment**: `Python 3`
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn sustindex.wsgi:application`

**Advanced Settings:**
- **Auto-Deploy**: Yes (recommended)
- **Branch**: `main`

### 4. Environment Variables

Add these environment variables in Render dashboard:

| Key | Value | Description |
|-----|-------|-------------|
| `SECRET_KEY` | (auto-generated) | Django secret key |
| `DEBUG` | `False` | Production mode |
| `DATABASE_URL` | (auto-generated) | PostgreSQL connection |

### 5. Database Setup

Render will automatically:
- Create a PostgreSQL database
- Set the `DATABASE_URL` environment variable
- Run migrations during build

### 6. Deploy

1. Click "Create Web Service"
2. Wait for the build process (5-10 minutes)
3. Your app will be available at: `https://your-service-name.onrender.com`

## Post-Deployment

### Access Your App
- **Website**: `https://your-service-name.onrender.com/en/`
- **Admin Panel**: `https://your-service-name.onrender.com/en/admin/`
- **Turkish**: `https://your-service-name.onrender.com/tr/`

### Default Login
- **Username**: `admin`
- **Password**: `admin123`

### Sample Users
- `company_free` / `test1234` (Free tier)
- `company_silver` / `test1234` (Silver tier)
- `company_gold` / `test1234` (Gold tier)

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check `build.sh` permissions: `chmod +x build.sh`
   - Verify all dependencies in `requirements.txt`

2. **Static Files Not Loading**
   - Ensure `whitenoise` is in requirements.txt
   - Check `STATICFILES_STORAGE` setting

3. **Database Connection Issues**
   - Verify `DATABASE_URL` environment variable
   - Check PostgreSQL service status

### Logs
View logs in Render dashboard:
1. Go to your service
2. Click "Logs" tab
3. Monitor for errors

## Updates

To update your deployed app:
1. Make changes locally
2. Commit and push to GitHub
3. Render will auto-deploy (if enabled)

## Custom Domain (Optional)

1. Go to service settings
2. Add custom domain
3. Configure DNS records as instructed

## Monitoring

Render provides:
- ✅ Automatic SSL certificates
- ✅ Health checks
- ✅ Metrics and monitoring
- ✅ Auto-scaling (paid plans)

## Cost

- **Free Tier**: 750 hours/month (enough for personal projects)
- **Paid Plans**: Starting from $7/month for always-on services

## Security Notes

- Never commit sensitive data to GitHub
- Use environment variables for secrets
- Enable 2FA on GitHub and Render accounts
- Regularly update dependencies

---

## Quick Commands

```bash
# Local development
python manage.py runserver

# Test production settings locally
DEBUG=False python manage.py runserver

# Collect static files
python manage.py collectstatic

# Create superuser
python manage.py createsuperuser
```

---

Made with 💚 for sustainable deployment!