#!/usr/bin/env bash
set -o errexit

echo "=== Step 1: Install Python dependencies ==="
pip install --upgrade pip
pip install -r requirements.txt

echo "=== Step 2: Build Next.js frontend ==="
cd ../frontend
npm ci
npm run build
npm run export || echo "Export not needed for Next.js 13+"

echo "=== Step 3: Copy frontend build to Django static ==="
cd ../sustindex-
rm -rf frontend-build
cp -r ../frontend/.next/standalone ./frontend-build 2>/dev/null || cp -r ../frontend/out ./frontend-build 2>/dev/null || cp -r ../frontend/.next ./frontend-build

echo "=== Step 4: Collect Django static files ==="
python manage.py collectstatic --no-input

echo "=== Step 5: Run migrations ==="
python manage.py migrate --noinput

echo "=== Build complete ==="
