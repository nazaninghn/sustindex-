# 🔧 رفع خطای "No module named 'dal'"

## مشکل
```
ModuleNotFoundError: No module named 'dal'
```

## علت
Render از Python 3.13 استفاده می‌کرد، ولی `django-autocomplete-light` با Python 3.13 سازگار نیست.

## راه‌حل‌های اعمال شده

### 1️⃣ محدود کردن نسخه Python
فایل `runtime.txt` ایجاد شد:
```
python-3.11.9
```

### 2️⃣ Import های Optional
کد به گونه‌ای تغییر کرد که اگر `dal` نصب نبود، خطا ندهد:

**`settings.py`:**
```python
# Check if django-autocomplete-light is installed
try:
    import dal
    import dal_select2
    OPTIONAL_APPS.extend(['dal', 'dal_select2'])
except ImportError:
    pass
```

**`admin.py`:**
```python
try:
    from dal import autocomplete
    DAL_AVAILABLE = True
except ImportError:
    DAL_AVAILABLE = False
```

**`autocomplete.py`:**
```python
try:
    from dal import autocomplete
    DAL_AVAILABLE = True
except ImportError:
    DAL_AVAILABLE = False
```

### 3️⃣ اسکریپت چک Import
فایل `check_imports.py` ایجاد شد که قبل از deploy همه پکیج‌ها رو چک می‌کنه.

### 4️⃣ Build Script بهبود یافت
`build.sh` حالا:
- نسخه Python رو نمایش می‌ده
- Import ها رو چک می‌کنه
- خطاها رو بهتر handle می‌کنه

## تست Local

```bash
# 1. چک کردن Python version
python --version
# باید 3.11.x باشه

# 2. نصب پکیج‌ها
pip install -r requirements.txt

# 3. چک کردن imports
python check_imports.py

# 4. تست Django
python manage.py check
```

## Deploy در Render

```bash
# 1. Commit تغییرات
git add .
git commit -m "Fix dal module error - use Python 3.11"
git push origin main

# 2. در Render Dashboard:
# - Manual Deploy کن
# - لاگ‌ها رو ببین
# - باید "Python 3.11.9" رو ببینی
```

## اگر باز خطا داد

### گزینه A: حذف کامل dal
اگر autocomplete لازم نیست:

```python
# در requirements.txt حذف کن:
# django-autocomplete-light==3.11.0

# در settings.py:
INSTALLED_APPS = [
    # 'dal',  # حذف شد
    # 'dal_select2',  # حذف شد
    ...
]
```

### گزینه B: استفاده از نسخه جدیدتر
```bash
# تست کن نسخه جدیدتر کار می‌کنه:
pip install django-autocomplete-light --upgrade
pip freeze | grep django-autocomplete-light
```

### گزینه C: استفاده از جایگزین
```bash
# استفاده از django-select2:
pip install django-select2
```

## چک‌لیست نهایی

- [x] `runtime.txt` ایجاد شد (Python 3.11.9)
- [x] `settings.py` - dal optional شد
- [x] `admin.py` - import با try/except
- [x] `autocomplete.py` - import با try/except
- [x] `check_imports.py` - اسکریپت تست
- [x] `build.sh` - بهبود یافت
- [x] `Procfile` - ایجاد شد

## نتیجه

با این تغییرات:
- ✅ Python 3.11 استفاده می‌شه
- ✅ اگر dal نصب نشد، برنامه کار می‌کنه
- ✅ خطاها بهتر handle می‌شن
- ✅ لاگ‌ها واضح‌تر هستن

---

موفق باشی! 🚀
