# ✅ چک‌لیست استقرار

## قبل از Push به GitHub

- [ ] `requirements.txt` به‌روز است
- [ ] `build.sh` قابل اجرا است (`chmod +x build.sh`)
- [ ] `render.yaml` تنظیم شده
- [ ] `.gitignore` شامل فایل‌های حساس است
- [ ] `SECRET_KEY` در کد هاردکد نشده
- [ ] `DEBUG=False` در production
- [ ] `ALLOWED_HOSTS` تنظیم شده

## فایل‌های ضروری

- [x] `requirements.txt` - لیست پکیج‌ها
- [x] `build.sh` - اسکریپت build
- [x] `render.yaml` - تنظیمات Render
- [x] `manage.py` - Django management
- [x] `wsgi.py` - WSGI application

## تنظیمات Django

- [x] `whitenoise` برای static files
- [x] `gunicorn` برای WSGI server
- [x] `psycopg2-binary` برای PostgreSQL
- [x] `dj-database-url` برای database config
- [x] `STATIC_ROOT` تنظیم شده
- [x] `STATICFILES_STORAGE` تنظیم شده

## امنیت

- [ ] `SECRET_KEY` از environment variable خوانده می‌شود
- [ ] `DEBUG=False` در production
- [ ] `ALLOWED_HOSTS` محدود شده
- [ ] HTTPS تنظیم شده (Render خودکار)
- [ ] رمز عبور admin تغییر کرده

## بعد از Deploy

- [ ] سایت باز می‌شود
- [ ] Static files لود می‌شوند
- [ ] Admin panel کار می‌کند
- [ ] Database متصل است
- [ ] ورود/خروج کار می‌کند
- [ ] فرم‌ها کار می‌کنند
- [ ] فایل‌ها آپلود می‌شوند

## تست نهایی

```bash
# تست local با تنظیمات production
DEBUG=False python manage.py runserver

# بررسی static files
python manage.py collectstatic --dry-run

# بررسی migrations
python manage.py showmigrations

# بررسی تنظیمات deployment
python manage.py check --deploy
```

## دستورات مفید

```bash
# مشاهده لاگ‌ها در Render
# Dashboard > Your Service > Logs

# اجرای دستورات در Render Shell
# Dashboard > Your Service > Shell

# مثال: ایجاد superuser
python manage.py createsuperuser

# مثال: اجرای migration
python manage.py migrate
```

---

همه چیز آماده است! 🚀
