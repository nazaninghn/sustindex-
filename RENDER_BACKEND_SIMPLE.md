# 🚀 Deploy بک‌اند روی Render (ساده)

## قدم 1: ساخت Database

1. برو به: https://render.com/dashboard
2. کلیک "New +" → "PostgreSQL"
3. تنظیمات:
   - Name: `sustindex-db`
   - Database: `sustindex`
   - User: `sustindex`
   - Region: Frankfurt
   - Plan: Free
4. کلیک "Create Database"
5. صبر کن تا Status بشه "Available" (2-3 دقیقه)

## قدم 2: Deploy بک‌اند

### روش 1: Manual (پیشنهادی)

1. کلیک "New +" → "Web Service"
2. "Connect repository" → `nazaninghn/sustindex-`
3. تنظیمات:

```
Name: sustindex-backend
Region: Frankfurt
Branch: main
Root Directory: sustindex-
Runtime: Python 3
Build Command: bash build-simple.sh
Start Command: gunicorn sustindex.wsgi:application --bind 0.0.0.0:$PORT --workers 2
```

4. Environment Variables (کلیک "Add Environment Variable"):

```
DATABASE_URL = [از database کپی کن - Internal Database URL]
SECRET_KEY = [یه رشته رندوم 50 کاراکتری]
DEBUG = False
DJANGO_SETTINGS_MODULE = sustindex.settings
ALLOWED_HOSTS = .onrender.com
```

برای SECRET_KEY می‌تونی از این استفاده کنی:
```
django-insecure-abc123xyz789-change-this-to-something-random
```

5. کلیک "Create Web Service"
6. صبر کن 3-5 دقیقه

### روش 2: با YAML (اگه روش 1 کار نکرد)

اگه می‌خوای از فایل YAML استفاده کنی:
1. فایل `render.yaml` رو rename کن به `render.yaml.backup`
2. فایل `render-simple.yaml` رو rename کن به `render.yaml`
3. Push کن به GitHub
4. Render خودش تشخیص میده

## قدم 3: چک کردن

بعد از اینکه deploy تموم شد:

1. URL سرویست رو کپی کن (مثلاً: `https://sustindex-backend.onrender.com`)
2. تست کن:
   - API: `https://sustindex-backend.onrender.com/api/v1/`
   - Admin: `https://sustindex-backend.onrender.com/admin/`
   - Swagger: `https://sustindex-backend.onrender.com/api/v1/swagger/`

## قدم 4: ساخت Admin User

1. توی Render Dashboard، روی سرویست کلیک کن
2. بالا سمت راست "Shell" رو انتخاب کن
3. تایپ کن:

```bash
python manage.py createsuperuser
```

4. وارد کن:
   - Username: `admin`
   - Email: `admin@example.com`
   - Password: (یه پسورد قوی)

## قدم 5: فرانت‌اند روی Vercel

حالا که بک‌اند کار می‌کنه، فرانت‌اند رو deploy کن:

1. برو به: https://vercel.com
2. "New Project" → Import `sustindex-`
3. تنظیمات:
   - Root Directory: `frontend`
   - Environment Variable:
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: `https://sustindex-backend.onrender.com/api/v1`
4. Deploy!

## قدم 6: آپدیت CORS

بعد از اینکه Vercel URL رو گرفتی (مثلاً `https://sustindex.vercel.app`):

1. برگرد به Render Dashboard
2. سرویس بک‌اند → "Environment"
3. اضافه کن یا آپدیت کن:
   - `FRONTEND_URL` = `https://sustindex.vercel.app`
4. سرویس خودکار restart میشه

## مشکلات رایج

### Build Failed
- چک کن `build-simple.sh` وجود داشته باشه
- چک کن Root Directory = `sustindex-`
- چک کن `requirements.txt` درست باشه

### Database Connection Error
- مطمئن شو `DATABASE_URL` رو از database کپی کردی
- باید "Internal Database URL" باشه نه "External"

### Static Files نمیاد
- توی Shell بزن: `python manage.py collectstatic --noinput`

### CORS Error
- مطمئن شو `FRONTEND_URL` رو ست کردی
- مطمئن شو Vercel URL درست باشه

## تموم! 🎉

بک‌اند: `https://sustindex-backend.onrender.com`
فرانت‌اند: `https://sustindex.vercel.app`

این روش خیلی ساده‌تر از full-stack deployment بود!
