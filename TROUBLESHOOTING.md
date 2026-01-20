# 🔧 راهنمای رفع خطاهای Render

## خطای: ModuleNotFoundError: No module named 'dal'

### علت:
`django-autocomplete-light` نصب نشده یا نسخه اشتباه است.

### راه حل:
```bash
# در requirements.txt مطمئن شوید این خط وجود دارد:
django-autocomplete-light==3.11.0

# یا نسخه جدیدتر:
pip install django-autocomplete-light --upgrade
```

---

## خطای: Build Failed - Permission Denied

### علت:
فایل `build.sh` قابل اجرا نیست.

### راه حل:
```bash
# روش 1: در render.yaml
buildCommand: "bash build.sh"

# روش 2: در Git
git update-index --chmod=+x build.sh
git add build.sh
git commit -m "Make build.sh executable"
git push
```

---

## خطای: Database Connection Failed

### علت:
- Database هنوز آماده نیست
- `DATABASE_URL` تنظیم نشده

### راه حل:
1. صبر کنید 2-3 دقیقه تا database آماده شود
2. در Render Dashboard بررسی کنید:
   - Database status = "Available"
   - Environment variable `DATABASE_URL` موجود است
3. Manual Deploy کنید

---

## خطای: Static Files Not Found (404)

### علت:
`collectstatic` اجرا نشده یا whitenoise تنظیم نیست.

### راه حل:
```python
# در settings.py:
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# در MIDDLEWARE:
'whitenoise.middleware.WhiteNoiseMiddleware',  # بعد از SecurityMiddleware
```

---

## خطای: compilemessages Failed

### علت:
`gettext` در سرور Render نصب نیست.

### راه حل:
این خطا مهم نیست! در `build.sh` این خط را دارید:
```bash
python manage.py compilemessages --ignore=venv 2>/dev/null || echo "⚠️ Skipping..."
```

اگر می‌خواهید gettext نصب کنید:
```bash
# در build.sh قبل از pip install:
apt-get update && apt-get install -y gettext
```

---

## خطای: Application Error / 503

### علت‌های محتمل:
1. Build موفق نبوده
2. Database متصل نیست
3. Migration اجرا نشده
4. Port اشتباه است

### راه حل:
```bash
# 1. بررسی Logs در Render Dashboard

# 2. بررسی startCommand در render.yaml:
startCommand: "gunicorn sustindex.wsgi:application --bind 0.0.0.0:$PORT"

# 3. بررسی ALLOWED_HOSTS در settings.py:
ALLOWED_HOSTS = ['*']  # یا دامنه Render

# 4. Manual Deploy
```

---

## خطای: SECRET_KEY Not Set

### علت:
Environment variable تنظیم نشده.

### راه حل:
در Render Dashboard:
1. برو به Service Settings
2. Environment Variables
3. اضافه کن:
   - Key: `SECRET_KEY`
   - Value: (Generate Random String)

یا در `render.yaml`:
```yaml
- key: SECRET_KEY
  generateValue: true
```

---

## خطای: CSRF Verification Failed

### علت:
تنظیمات CSRF برای production درست نیست.

### راه حل:
```python
# در settings.py:
CSRF_TRUSTED_ORIGINS = [
    'https://your-app.onrender.com',
    'https://*.onrender.com',
]

# اگر DEBUG=False:
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
```

---

## خطای: Admin CSS Not Loading

### علت:
Static files جمع‌آوری نشده یا whitenoise کار نمی‌کند.

### راه حل:
```bash
# 1. بررسی build.sh:
python manage.py collectstatic --no-input

# 2. بررسی settings.py:
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# 3. بررسی MIDDLEWARE:
'whitenoise.middleware.WhiteNoiseMiddleware',  # باید بعد از SecurityMiddleware باشه
```

---

## خطای: Migrations Not Applied

### علت:
`migrate` در build اجرا نشده.

### راه حل:
```bash
# در build.sh:
python manage.py migrate

# یا Manual در Render Shell:
python manage.py migrate
python manage.py showmigrations
```

---

## خطای: Memory Limit Exceeded (Free Tier)

### علت:
Free tier فقط 512MB RAM دارد.

### راه حل:
```yaml
# در render.yaml کاهش workers:
envVars:
  - key: WEB_CONCURRENCY
    value: 1  # یا 2

# در startCommand:
gunicorn sustindex.wsgi:application --workers 1 --threads 2
```

---

## تست Local با تنظیمات Production

```bash
# 1. تنظیم environment variables:
export DEBUG=False
export SECRET_KEY="test-secret-key-for-local"
export DATABASE_URL="sqlite:///db.sqlite3"

# 2. اجرای سرور:
python manage.py runserver

# 3. بررسی deployment:
python manage.py check --deploy

# 4. تست imports:
python test_deployment.py
```

---

## دستورات مفید Render Shell

```bash
# دسترسی به Shell:
# Dashboard > Your Service > Shell

# بررسی environment variables:
env | grep DATABASE_URL
env | grep SECRET_KEY

# بررسی migrations:
python manage.py showmigrations

# ایجاد superuser:
python manage.py createsuperuser

# بررسی static files:
ls -la staticfiles/

# تست database:
python manage.py dbshell
```

---

## چک‌لیست نهایی

- [ ] `requirements.txt` کامل است
- [ ] `build.sh` قابل اجرا است
- [ ] `render.yaml` صحیح است
- [ ] `runtime.txt` نسخه Python را مشخص می‌کند
- [ ] `ALLOWED_HOSTS` تنظیم شده
- [ ] `SECRET_KEY` از environment می‌خواند
- [ ] `DEBUG=False` در production
- [ ] `whitenoise` نصب و تنظیم شده
- [ ] `STATIC_ROOT` مشخص شده
- [ ] Database connection تست شده

---

## کمک بیشتر

- 📖 [Render Docs](https://render.com/docs)
- 📖 [Django Deployment](https://docs.djangoproject.com/en/5.0/howto/deployment/)
- 💬 [Render Community](https://community.render.com/)

---

اگر مشکل حل نشد، لاگ کامل رو بفرست! 🔍
