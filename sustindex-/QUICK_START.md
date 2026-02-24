# Sustindex - Quick Start Guide

## 🚀 Quick Start (English)

### 1. Activate Virtual Environment
```bash
.\venv\Scripts\activate
```

### 2. Run Server
```bash
python manage.py runserver
```

### 3. Access the Website
- **English**: http://127.0.0.1:8000/en/
- **Turkish**: http://127.0.0.1:8000/tr/

### 4. Admin Panel
- **URL**: http://127.0.0.1:8000/en/admin/
- **Username**: `admin`
- **Password**: `admin123`

---

## 🇹🇷 Hızlı Başlangıç (Türkçe)

### 1. Sanal Ortamı Etkinleştir
```bash
.\venv\Scripts\activate
```

### 2. Sunucuyu Çalıştır
```bash
python manage.py runserver
```

### 3. Web Sitesine Eriş
- **İngilizce**: http://127.0.0.1:8000/en/
- **Türkçe**: http://127.0.0.1:8000/tr/

### 4. Admin Paneli
- **URL**: http://127.0.0.1:8000/tr/admin/
- **Kullanıcı adı**: `admin`
- **Şifre**: `admin123`

---

## Sample Users / Örnek Kullanıcılar

| Username | Password | Membership | Üyelik |
|----------|----------|------------|--------|
| admin | admin123 | Superuser | Süper Kullanıcı |
| company_free | test1234 | Free | Ücretsiz |
| company_silver | test1234 | Silver | Gümüş |
| company_gold | test1234 | Gold | Altın |

---

## Features / Özellikler

### English:
- ✅ Three-tier membership system
- ✅ Smart questionnaire with scoring
- ✅ E-learning platform for Gold members
- ✅ Powerful admin panel
- ✅ Bilingual (English & Turkish)

### Türkçe:
- ✅ Üç seviyeli üyelik sistemi
- ✅ Puanlama sistemi ile akıllı anket
- ✅ Altın üyeler için e-öğrenme platformu
- ✅ Güçlü yönetim paneli
- ✅ İki dilli (İngilizce ve Türkçe)

---

## Language Selection / Dil Seçimi

### English:
Click on the language selector (🇬🇧 EN / 🇹🇷 TR) in the top navigation bar to switch languages.

### Türkçe:
Dil değiştirmek için üst gezinme çubuğundaki dil seçiciyi (🇬🇧 EN / 🇹🇷 TR) tıklayın.

---

## Admin Panel Usage / Yönetim Paneli Kullanımı

### Create Questions / Soru Oluşturma:

**English:**
1. Go to "Categories" and create categories
2. Go to "Questions" and add questions
3. Set options and scores for each question

**Türkçe:**
1. "Kategoriler"e gidin ve kategoriler oluşturun
2. "Sorular"a gidin ve sorular ekleyin
3. Her soru için seçenekler ve puanlar belirleyin

---

## Development / Geliştirme

### Update Translations / Çevirileri Güncelleme:

```bash
# Extract new translatable strings
python manage.py makemessages -l tr --ignore=venv
python manage.py makemessages -l en --ignore=venv

# Edit translation files in locale/[LANG]/LC_MESSAGES/django.po

# Compile translations
python manage.py compilemessages --ignore=venv
```

---

## Support / Destek

**English:** For questions and issues, contact the development team.

**Türkçe:** Sorular ve sorunlar için geliştirme ekibiyle iletişime geçin.
