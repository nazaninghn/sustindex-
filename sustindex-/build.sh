#!/usr/bin/env bash
set -o errexit

echo "========================================="
echo "Starting build process..."
echo "========================================="

echo ""
echo "[1/8] Checking Python version..."
python --version || { echo "Python not found!"; exit 1; }

echo ""
echo "[2/8] Checking current directory..."
pwd
ls -la

echo ""
echo "[3/8] Upgrading pip..."
pip install --upgrade pip setuptools wheel || { echo "Failed to upgrade pip"; exit 1; }

echo ""
echo "[4/8] Installing Python dependencies..."
if [ -f "requirements.txt" ]; then
    echo "Found requirements.txt"
    pip install -r requirements.txt --no-cache-dir || { echo "Failed to install Python dependencies"; exit 1; }
else
    echo "ERROR: requirements.txt not found!"
    exit 1
fi

echo ""
echo "[5/8] Building Next.js frontend..."
if [ -d "../frontend" ]; then
    cd ../frontend
    echo "Installing Node dependencies..."
    npm install || { echo "Failed npm install"; exit 1; }
    echo "Building Next.js..."
    npm run build || { echo "Failed npm build"; exit 1; }
    cd ../sustindex-
else
    echo "ERROR: frontend directory not found!"
    exit 1
fi

echo ""
echo "[6/8] Collecting static files..."
python manage.py collectstatic --no-input || { echo "Failed to collect static files"; exit 1; }

echo ""
echo "[7/8] Running migrations..."
python manage.py makemigrations --noinput || echo "No new migrations"
python manage.py migrate --noinput || { echo "Failed to run migrations"; exit 1; }

echo ""
echo "[8/8] Setting up initial data..."
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Admin user created')
else:
    print('Admin user already exists')
" || echo "Setup had issues (non-critical)"

echo ""
echo "========================================="
echo "Build completed successfully!"
echo "========================================="

