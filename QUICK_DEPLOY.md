# 🚀 استقرار سریع روی Render

## مراحل (5 دقیقه)

### 1. Push به GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. ایجاد سرویس در Render

1. برو به: https://dashboard.render.com/
2. کلیک کن: **New +** → **Blueprint**
3. انتخاب کن: مخزن GitHub خودت
4. کلیک کن: **Apply**

✅ تمام! Render خودکار همه چیز رو تنظیم می‌کنه.

## لینک‌های مهم

بعد از deploy:
- 🌐 سایت: `https://your-app.onrender.com/en/`
- 👤 Admin: `https://your-app.onrender.com/en/admin/`
- 🇹🇷 ترکی: `https://your-app.onrender.com/tr/`

**ورود پیش‌فرض:**
- Username: `admin`
- Password: `admin123`

## اگر خطا دادی

### خطای Build
```bash
# بررسی کن build.sh قابل اجرا باشه:
git update-index --chmod=+x build.sh
git commit -m "Make build.sh executable"
git push
```

### خطای Requirements
```bash
# مطمئن شو requirements.txt درست باشه
# نسخه‌ها رو چک کن
```

### خطای Database
```bash
# صبر کن تا database آماده بشه (2-3 دقیقه)
# بعد Render خودکار دوباره تلاش می‌کنه
```

## نکات مهم

⚠️ **Free Tier:**
- بعد از 15 دقیقه بی‌استفاده، خاموش می‌شه
- اولین بار بارگذاری کنده (30 ثانیه)
- 750 ساعت در ماه رایگان

💡 **بعد از Deploy:**
- رمز admin رو عوض کن
- لاگ‌ها رو چک کن
- تست کن همه چی کار کنه

## کمک بیشتر

- 📖 راهنمای کامل: `RENDER_DEPLOYMENT.md`
- ✅ چک‌لیست: `DEPLOYMENT_CHECKLIST.md`
- 🌐 مستندات Render: https://render.com/docs

---

موفق باشی! 🎉
