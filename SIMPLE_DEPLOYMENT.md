# 🚀 راهنمای ساده Deploy (جداگانه)

این روش خیلی ساده‌تر و سریع‌تره!

## قدم 1: بک‌اند روی Railway (5 دقیقه)

### 1.1 ساخت اکانت
- برو به: https://railway.app
- "Login with GitHub" کلیک کن
- اجازه دسترسی بده

### 1.2 ساخت پروژه جدید
1. کلیک روی "New Project"
2. انتخاب "Deploy from GitHub repo"
3. پیدا کن: `nazaninghn/sustindex-`
4. کلیک روی repository

### 1.3 تنظیمات
1. **Root Directory**: `sustindex-`
2. کلیک "Add variables" و اینا رو اضافه کن:

```
SECRET_KEY=django-insecure-your-secret-key-here-change-this
DEBUG=False
ALLOWED_HOSTS=.railway.app
DJANGO_SETTINGS_MODULE=sustindex.settings
```

### 1.4 اضافه کردن Database
1. کلیک روی "New" → "Database" → "Add PostgreSQL"
2. خودکار به پروژه وصل میشه!
3. متغیر `DATABASE_URL` خودکار اضافه میشه

### 1.5 Deploy
- خودکار شروع میشه!
- صبر کن 3-5 دقیقه
- وقتی تموم شد، یه URL میده مثل: `https://sustindex-production.up.railway.app`

### 1.6 ساخت Admin User
1. کلیک روی سرویس
2. بالا سمت راست "..." → "Shell"
3. تایپ کن:
```bash
python manage.py createsuperuser
```
4. Username: admin
5. Email: admin@example.com
6. Password: (یه پسورد قوی بزن)

✅ **بک‌اند آماده است!**

---

## قدم 2: فرانت‌اند روی Vercel (3 دقیقه)

### 2.1 ساخت اکانت
- برو به: https://vercel.com
- "Sign Up with GitHub" کلیک کن

### 2.2 Import پروژه
1. کلیک "Add New..." → "Project"
2. "Import Git Repository"
3. پیدا کن: `nazaninghn/sustindex-`
4. کلیک "Import"

### 2.3 تنظیمات
1. **Framework Preset**: Next.js (خودکار تشخیص میده)
2. **Root Directory**: کلیک "Edit" → تایپ کن: `frontend`
3. **Environment Variables**: کلیک "Add"
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://sustindex-production.up.railway.app/api/v1`
   (URL رو از Railway کپی کن و `/api/v1` اضافه کن)

### 2.4 Deploy
1. کلیک "Deploy"
2. صبر کن 2-3 دقیقه
3. تموم! 🎉

✅ **فرانت‌اند آماده است!**

---

## قدم 3: آپدیت CORS در بک‌اند

باید به Django بگی که درخواست‌های Vercel رو قبول کنه.

### 3.1 آپدیت ALLOWED_HOSTS
1. برو به Railway Dashboard
2. کلیک روی سرویس Django
3. "Variables" → پیدا کن `ALLOWED_HOSTS`
4. عوضش کن به:
```
.railway.app,.vercel.app,your-vercel-domain.vercel.app
```

### 3.2 آپدیت CORS
توی کد، فایل `sustindex-/sustindex/settings.py` این خط رو داره:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://localhost:3000",
]
```

باید Vercel URL رو اضافه کنی. بیا این کار رو بکنیم...

---

## تست نهایی

### بک‌اند:
- API: `https://your-railway-url.railway.app/api/v1/`
- Admin: `https://your-railway-url.railway.app/admin/`
- Swagger: `https://your-railway-url.railway.app/api/v1/swagger/`

### فرانت‌اند:
- سایت: `https://your-project.vercel.app/`

---

## مزایا این روش:

✅ خیلی ساده‌تر از Render
✅ Railway مشکل کمتری داره
✅ Vercel برای Next.js عالیه
✅ هر کدوم رو جداگانه می‌تونی مدیریت کنی
✅ Build سریع‌تر (2-3 دقیقه به جای 15 دقیقه)
✅ رایگان!

---

## اگه مشکلی پیش اومد:

### Railway نمیشه:
- چک کن `requirements.txt` درست باشه
- چک کن `runtime.txt` داشته باشی با `python-3.12.0`

### Vercel نمیشه:
- مطمئن شو Root Directory = `frontend`
- مطمئن شو `NEXT_PUBLIC_API_URL` درست باشه

### CORS Error:
- باید Vercel URL رو به Django CORS اضافه کنی (قدم 3)

---

**همین! خیلی ساده‌تر از Render بود 😊**
