#!/usr/bin/env bash
# exit on error
set -o errexit

echo "🐍 Python version:"
python --version

echo ""
echo "📦 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo ""
echo "🔍 Checking imports..."
python check_imports.py || echo "⚠️ Some optional packages missing, continuing..."

echo ""
echo "📁 Collecting static files..."
python manage.py collectstatic --no-input

echo ""
echo "🗄️ Running migrations..."
python manage.py migrate

echo ""
echo "🌍 Compiling translations..."
# Skip compilemessages if gettext is not available
python manage.py compilemessages --ignore=venv 2>/dev/null || echo "⚠️ Skipping compilemessages (gettext not available)"

echo ""
echo "👤 Setting up initial data..."
# Create superuser and sample data if needed
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

if not User.objects.filter(username='admin').exists():
    try:
        print('Running setup.py...')
        exec(open('setup.py').read())
        print('✅ Setup completed successfully')
    except Exception as e:
        print(f'⚠️ Setup script error: {e}')
        print('Creating basic admin user...')
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print('✅ Admin user created')
else:
    print('✅ Admin user already exists')
" 2>&1 || echo "⚠️ Setup had issues, but continuing..."

echo ""
echo "✅ Build completed successfully!"