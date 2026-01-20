#!/usr/bin/env python
"""
Test script to verify deployment readiness
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

def test_imports():
    """Test that all required packages can be imported"""
    print("🧪 Testing imports...")
    
    try:
        import dal
        import dal_select2
        print("✅ django-autocomplete-light (dal)")
    except ImportError as e:
        print(f"❌ django-autocomplete-light: {e}")
        return False
    
    try:
        import crispy_forms
        import crispy_bootstrap5
        print("✅ crispy-forms")
    except ImportError as e:
        print(f"❌ crispy-forms: {e}")
        return False
    
    try:
        import ckeditor
        print("✅ django-ckeditor")
    except ImportError as e:
        print(f"❌ django-ckeditor: {e}")
        return False
    
    try:
        import import_export
        print("✅ django-import-export")
    except ImportError as e:
        print(f"❌ django-import-export: {e}")
        return False
    
    try:
        import simple_history
        print("✅ django-simple-history")
    except ImportError as e:
        print(f"❌ django-simple-history: {e}")
        return False
    
    try:
        import gunicorn
        print("✅ gunicorn")
    except ImportError as e:
        print(f"❌ gunicorn: {e}")
        return False
    
    try:
        import psycopg2
        print("✅ psycopg2-binary")
    except ImportError as e:
        print(f"❌ psycopg2-binary: {e}")
        return False
    
    try:
        import whitenoise
        print("✅ whitenoise")
    except ImportError as e:
        print(f"❌ whitenoise: {e}")
        return False
    
    return True

def test_settings():
    """Test Django settings"""
    print("\n⚙️ Testing settings...")
    
    from django.conf import settings
    
    # Check INSTALLED_APPS
    required_apps = ['dal', 'dal_select2', 'crispy_forms', 'ckeditor', 'import_export', 'simple_history']
    for app in required_apps:
        if app in settings.INSTALLED_APPS:
            print(f"✅ {app} in INSTALLED_APPS")
        else:
            print(f"❌ {app} NOT in INSTALLED_APPS")
            return False
    
    # Check middleware
    if 'whitenoise.middleware.WhiteNoiseMiddleware' in settings.MIDDLEWARE:
        print("✅ WhiteNoise middleware configured")
    else:
        print("❌ WhiteNoise middleware NOT configured")
        return False
    
    # Check static files
    if hasattr(settings, 'STATIC_ROOT'):
        print(f"✅ STATIC_ROOT: {settings.STATIC_ROOT}")
    else:
        print("❌ STATIC_ROOT not set")
        return False
    
    return True

def test_database():
    """Test database connection"""
    print("\n🗄️ Testing database...")
    
    try:
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        print("✅ Database connection successful")
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False

def test_models():
    """Test that models can be imported"""
    print("\n📦 Testing models...")
    
    try:
        from accounts.models import User, CompanyProfile
        print("✅ accounts.models")
    except Exception as e:
        print(f"❌ accounts.models: {e}")
        return False
    
    try:
        from questionnaire.models import Category, Question, Answer
        print("✅ questionnaire.models")
    except Exception as e:
        print(f"❌ questionnaire.models: {e}")
        return False
    
    try:
        from elearning.models import Course, Lesson
        print("✅ elearning.models")
    except Exception as e:
        print(f"❌ elearning.models: {e}")
        return False
    
    try:
        from reports.models import Report
        print("✅ reports.models")
    except Exception as e:
        print(f"❌ reports.models: {e}")
        return False
    
    return True

def main():
    """Run all tests"""
    print("=" * 50)
    print("🚀 Deployment Readiness Test")
    print("=" * 50)
    
    results = []
    
    results.append(("Imports", test_imports()))
    results.append(("Settings", test_settings()))
    results.append(("Database", test_database()))
    results.append(("Models", test_models()))
    
    print("\n" + "=" * 50)
    print("📊 Test Results")
    print("=" * 50)
    
    all_passed = True
    for name, passed in results:
        status = "✅ PASSED" if passed else "❌ FAILED"
        print(f"{name}: {status}")
        if not passed:
            all_passed = False
    
    print("=" * 50)
    
    if all_passed:
        print("🎉 All tests passed! Ready for deployment!")
        return 0
    else:
        print("⚠️ Some tests failed. Please fix the issues before deploying.")
        return 1

if __name__ == '__main__':
    sys.exit(main())
