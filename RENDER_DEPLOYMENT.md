# 🚀 راهنمای استقرار روی Render.com

## مراحل استقرار

### 1️⃣ آماده‌سازی پروژه

قبل از استقرار، مطمئن شوید:
- ✅ تمام فایل‌ها commit شده‌اند
- ✅ پروژه روی GitHub قرار دارد
- ✅ فایل‌های زیر موجود هستند:
  - `requirements.txt`
  - `build.sh`
  - `render.yaml`

### 2️⃣ ایجاد سرویس در Render

1. به [Render Dashboard](https://dashboard.render.com/) بروید
2. روی **"New +"** کلیک کنید
3. **"Blueprint"** را انتخاب کنید
4. مخزن GitHub خود را متصل کنید
5. فایل `render.yaml` به صورت خودکار تشخیص داده می‌شود

### 3️⃣ تنظیمات محیطی (اختیاری)

متغیرهای زیر به صورت خودکار تنظیم می‌شوند:
- `DATABASE_URL` - اتصال به PostgreSQL
- `SECRET_KEY` - کلید امنیتی Django
- `DEBUG` - حالت تولید (False)

### 4️⃣ استقرار

1. روی **"Apply"** کلیک کنید
2. منتظر بمانید تا build تکمیل شود (5-10 دقیقه)
3. پس از موفقیت، لینک سایت شما نمایش داده می‌شود

## 🔍 بررسی خطاها

اگر خطا دریافت کردید:

### خطای Build
```bash
# بررسی لاگ‌ها در Render Dashboard
# معمولاً مربوط به:
- نسخه Python
- پکیج‌های requirements.txt
- دسترسی به build.sh
```

### خطای Database
```bash
# مطمئن شوید DATABASE_URL تنظیم شده
# در تنظیمات Render بررسی کنید
```

### خطای Static Files
```bash
# مطمئن شوید whitenoise نصب شده
# collectstatic در build.sh اجرا می‌شود
```

## 📱 دسترسی به برنامه

پس از استقرار موفق:

- **صفحه اصلی**: `https://your-app.onrender.com/en/`
- **پنل مدیریت**: `https://your-app.onrender.com/en/admin/`
- **نسخه ترکی**: `https://your-app.onrender.com/tr/`

### ورود پیش‌فرض
- **نام کاربری**: `admin`
- **رمز عبور**: `admin123`

⚠️ **مهم**: بعد از اولین ورود، رمز عبور را تغییر دهید!

## 🔄 به‌روزرسانی

برای به‌روزرسانی برنامه:

```bash
git add .
git commit -m "توضیحات تغییرات"
git push origin main
```

Render به صورت خودکار برنامه را دوباره deploy می‌کند.

## 💡 نکات مهم

1. **Free Tier محدودیت دارد**:
   - 750 ساعت در ماه
   - بعد از 15 دقیقه عدم استفاده، خاموش می‌شود
   - اولین بار بارگذاری کند است (30 ثانیه)

2. **Database Backup**:
   - در پلن رایگان، backup خودکار ندارد
   - برای پروژه‌های مهم، پلن پولی استفاده کنید

3. **Logs**:
   - همیشه لاگ‌ها را بررسی کنید
   - در Dashboard > Logs

## 🛠️ عیب‌یابی رایج

### مشکل: Static files لود نمی‌شوند
```python
# در settings.py بررسی کنید:
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

### مشکل: Database connection error
```bash
# بررسی کنید DATABASE_URL در Environment Variables تنظیم شده
# در Render Dashboard > Environment
```

### مشکل: Build fails
```bash
# بررسی کنید build.sh قابل اجرا است:
chmod +x build.sh
git add build.sh
git commit -m "Make build.sh executable"
git push
```

## 📞 پشتیبانی

- [مستندات Render](https://render.com/docs)
- [انجمن Render](https://community.render.com/)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/)

---

موفق باشید! 🎉
