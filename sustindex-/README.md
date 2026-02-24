# 🌱 Sustindex - ESG Assessment Platform

A comprehensive **Environmental, Social, and Governance (ESG)** assessment platform designed for businesses to evaluate, track, and improve their sustainability performance.

![Sustindex Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Django](https://img.shields.io/badge/Django-4.2.7-blue)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 **Core Functionality**
- **Comprehensive ESG Assessment** - 10+ questions across Environmental, Social, and Governance categories
- **Professional Scoring System** - Weighted scoring with A+ to D grades
- **Document Upload** - Support for evidence files (PDF, DOC, XLS, images)
- **PDF Report Generation** - Executive-ready sustainability reports
- **Multi-language Support** - English and Turkish localization

### 🎨 **Modern UI/UX**
- **Professional Design** - Enterprise-grade interface with Inter font
- **Responsive Layout** - Optimized for desktop, tablet, and mobile
- **Interactive Animations** - Smooth transitions and progress indicators
- **Accessibility Compliant** - WCAG guidelines adherence

### 👥 **User Management**
- **Multi-tier Membership** - Free, Silver, and Gold subscription levels
- **Secure Authentication** - Django's built-in security features
- **User Dashboard** - Comprehensive performance tracking
- **Assessment History** - Track progress over time

### 📊 **Reporting & Analytics**
- **ESG Scoring Engine** - Based on international standards
- **Visual Analytics** - Charts, progress bars, and performance metrics
- **Professional Reports** - PDF export with recommendations
- **Performance Insights** - Strengths, priorities, and opportunities

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- PostgreSQL
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/sustindex.git
cd sustindex
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Environment setup**
```bash
# Create .env file
cp .env.example .env
# Edit .env with your database credentials
```

5. **Database setup**
```bash
python manage.py migrate
python manage.py collectstatic
```

6. **Create sample data**
```bash
python setup.py
python add_questions.py
python setup_esg_weights.py
```

7. **Create superuser**
```bash
python manage.py createsuperuser
```

8. **Run development server**
```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` to access the platform.

## 📁 Project Structure

```
sustindex/
├── accounts/           # User management and authentication
├── questionnaire/      # ESG assessment logic
├── reports/           # Report generation and analytics
├── elearning/         # Educational content (Gold tier)
├── templates/         # HTML templates
├── static/           # CSS, JS, images
├── locale/           # Internationalization files
├── media/            # User uploaded files
└── sustindex/        # Django project settings
```

## 🎨 Design System

### Color Palette
- **Primary**: `#1F7A63` - Professional green
- **Accent**: `#4C6EF5` - Data visualization blue  
- **Success**: `#28A745` - Achievement green
- **Warning**: `#FF6B35` - Alert orange
- **Gold**: `#FFD700` - Premium highlights

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## 🔧 Configuration

### Environment Variables
```env
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost/sustindex
ALLOWED_HOSTS=yourdomain.com
```

### Membership Tiers
- **Free**: Basic access, limited assessments
- **Silver**: One complete assessment with PDF report
- **Gold**: Unlimited assessments + E-learning modules

## 📊 ESG Framework

### Assessment Categories
1. **Environmental** (33.3% weight)
   - Waste management
   - Energy usage
   - Environmental certifications
   - Green building practices

2. **Social** (33.3% weight)
   - Employee training
   - Labor practices
   - Product safety
   - Community engagement

3. **Governance** (33.3% weight)
   - Board independence
   - Risk management
   - Data privacy
   - Transparency

### Scoring System
- **A+ (90-100)**: Outstanding performance
- **A (80-89)**: Excellent performance
- **B+ (70-79)**: Good performance
- **B (60-69)**: Fair performance
- **C+ (50-59)**: Below average
- **C (40-49)**: Poor performance
- **D (0-39)**: Needs significant improvement

## 🚀 Deployment

### Production Setup
1. **Configure PostgreSQL database**
2. **Set environment variables**
3. **Run migrations and collect static files**
4. **Configure web server (Nginx + Gunicorn)**
5. **Set up SSL certificate**

### Docker Deployment
```bash
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Django Framework** - Web framework
- **Bootstrap & Font Awesome** - UI components and icons
- **ReportLab** - PDF generation
- **PostgreSQL** - Database system
- **Inter Font** - Typography by Rasmus Andersson

## 📞 Support

For support, email support@sustindex.com or create an issue on GitHub.

## 🔮 Roadmap

- [ ] Industry benchmarking
- [ ] Time-series analysis
- [ ] Goal setting and tracking
- [ ] AI-powered recommendations
- [ ] API integrations
- [ ] Mobile app

---

**Built with ❤️ for a sustainable future**

*Sustindex helps organizations measure, track, and improve their ESG performance with professional-grade assessment tools.*