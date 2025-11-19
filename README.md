# 🌱 Sustindex - Corporate Sustainability Assessment Platform

A comprehensive Django-based platform for corporate sustainability assessment with multi-tier membership system and e-learning capabilities.

![Django](https://img.shields.io/badge/Django-4.2-green)
![Python](https://img.shields.io/badge/Python-3.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌍 Languages / Diller
- 🇬🇧 **English** (Default)
- 🇹🇷 **Türkçe** (Istanbul Turkish)

---

## ✨ Features

### 🎯 Core Features
- **Multi-tier Membership System**: Free, Silver, and Gold membership levels with different access rights
- **Sustainability Questionnaire**: Comprehensive assessment with category-based questions and automatic scoring
- **E-Learning Platform**: Exclusive courses and lessons for Gold members with progress tracking
- **Multi-language Support**: Full support for English and Turkish (i18n)
- **Admin Panel**: Complete content management system for all aspects of the platform
- **Modern UI**: Professional, responsive design with green sustainability-themed color palette

### 👥 Membership Levels

| Level | Questionnaire | Reports | E-Learning | Retake |
|-------|--------------|---------|------------|--------|
| **Free** | ❌ Limited | ❌ No | ❌ No | ❌ No |
| **Silver** | ✅ Once | ✅ Once | ❌ No | ❌ No |
| **Gold** | ✅ Unlimited | ✅ Unlimited | ✅ Yes | ✅ Yes |

### 🎓 E-Learning Features
- Separate course libraries for each company
- Video lessons with rich text content
- File attachments for lessons
- Progress tracking
- Complete data isolation between companies

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/sustindex.git
cd sustindex
```

2. **Create and activate virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run migrations**
```bash
python manage.py migrate
```

5. **Create superuser**
```bash
python manage.py createsuperuser
```

6. **Compile translations**
```bash
python manage.py compilemessages --ignore=venv
```

7. **Run development server**
```bash
python manage.py runserver
```

8. **Access the application**
- English: http://127.0.0.1:8000/en/
- Turkish: http://127.0.0.1:8000/tr/
- Admin panel: http://127.0.0.1:8000/en/admin/

---

## 📊 Sample Data

### Default Admin Account
- **Username**: `admin`
- **Password**: `admin123`

### Test Users
| Username | Password | Membership |
|----------|----------|------------|
| company_free | test1234 | Free |
| company_silver | test1234 | Silver |
| company_gold | test1234 | Gold |

### Sample Questions
- 3 categories (Environment, Social Responsibility, Corporate Governance)
- 4 sample questions with multiple choice options
- Different scores for each option

---

## 📁 Project Structure

```
sustindex/
├── accounts/           # User management and authentication
├── questionnaire/      # Sustainability assessment system
├── elearning/         # E-learning platform
├── reports/           # Report generation
├── templates/         # HTML templates
├── locale/            # Translation files
│   ├── en/           # English
│   └── tr/           # Turkish
├── static/            # Static files (CSS, JS, images)
├── media/             # Uploaded files
└── sustindex/         # Project settings
```

---

## 🛠️ Technologies Used

- **Backend**: Django 4.2.7
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **Rich Text Editor**: CKEditor
- **Internationalization**: Django i18n
- **Frontend**: HTML5, CSS3, JavaScript
- **Fonts**: Google Fonts (Poppins)
- **Forms**: Django Crispy Forms

---

## 📊 Admin Panel Features

The admin panel provides complete control over:
- ✅ User management and membership levels
- ✅ Company profiles with custom fields
- ✅ Question categories and questions
- ✅ Answer choices with scoring system
- ✅ Questionnaire attempts and results
- ✅ E-learning courses and lessons
- ✅ Lesson attachments and progress tracking
- ✅ Membership history

### How to Use Admin Panel

#### 1. Create Questions

**Step 1: Create Categories**
- Go to "Categories"
- Add category name and description
- Set display order

**Step 2: Add Questions**
- Go to "Questions"
- Select category
- Enter question text (supports rich text)
- Set display order
- Mark as "Active"

**Step 3: Set Options and Scores**
- In the question form, add choices inline
- Enter choice text
- Set score (e.g., 0, 5, 10)
- Set display order

**Example:**
```
Question: Do you have a waste management program?
  ✓ Yes, comprehensive program - Score: 10
  ✓ Partially - Score: 5
  ✓ No - Score: 0
```

#### 2. Manage Memberships
- Go to "Users"
- Select a user
- Change "Membership Type" field
- Save changes

#### 3. Create E-Learning Content
- Go to "Courses"
- Create course for a Gold member company
- Add lessons with content and videos
- Upload attachments if needed

---

## 🌐 Multi-language Support

### Switching Languages

**From Website:**
Click on the language selector (🇬🇧 EN / 🇹🇷 TR) in the navigation bar

**Direct URL:**
- English: Add `/en/` to URL
- Turkish: Add `/tr/` to URL

### Adding New Languages

```bash
# Create translation files
python manage.py makemessages -l [language_code] --ignore=venv

# Edit the .po file in locale/[language_code]/LC_MESSAGES/django.po

# Compile translations
python manage.py compilemessages --ignore=venv
```

---

## 👨‍💻 Development

### Database Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

### Update Translations

```bash
# Extract translatable strings
python manage.py makemessages -l tr --ignore=venv
python manage.py makemessages -l en --ignore=venv

# Compile translations
python manage.py compilemessages --ignore=venv
```

### Collect Static Files (Production)

```bash
python manage.py collectstatic
```

---

## 🎨 Design Features

- Modern, clean interface
- Sustainability-themed green color palette (#1b4332, #2d6a4f, #52b788)
- Smooth animations and transitions
- Fully responsive design
- Accessibility compliant
- Professional dashboard layouts
- Confetti effects on success pages

---

## 📝 License

This project is licensed under the MIT License.

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with 💚 for a sustainable future

---

# Türkçe

## Hızlı Başlangıç

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

### 4. Yönetim Paneli
- **URL**: http://127.0.0.1:8000/tr/admin/
- **Kullanıcı adı**: `admin`
- **Şifre**: `admin123`

## Özellikler

- ✅ Üç seviyeli üyelik sistemi (Ücretsiz, Gümüş, Altın)
- ✅ Puanlama sistemi ile akıllı anket
- ✅ Altın üyeler için e-öğrenme platformu
- ✅ Güçlü yönetim paneli
- ✅ İki dilli arayüz (İngilizce/Türkçe)
- ✅ Şirket kayıt formu
- ✅ Modern ve profesyonel tasarım

## Üyelik Seviyeleri

| Seviye | Anket | Raporlar | E-Öğrenme | Tekrar |
|--------|-------|----------|-----------|--------|
| **Ücretsiz** | ❌ Sınırlı | ❌ Hayır | ❌ Hayır | ❌ Hayır |
| **Gümüş** | ✅ Bir kez | ✅ Bir kez | ❌ Hayır | ❌ Hayır |
| **Altın** | ✅ Sınırsız | ✅ Sınırsız | ✅ Evet | ✅ Evet |

## Dil Değiştirme

Üst menüdeki dil seçiciyi (🇬🇧 EN / 🇹🇷 TR) kullanarak dilinizi değiştirebilirsiniz.

## Destek

Sorular ve sorunlar için GitHub'da issue açabilirsiniz.
