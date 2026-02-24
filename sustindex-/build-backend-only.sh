#!/usr/bin/env bash
set -o errexit

echo "========================================="
echo "Backend-only build (for testing)"
echo "========================================="

echo ""
echo "[1/4] Python version:"
python --version

echo ""
echo "[2/4] Upgrading pip..."
pip install --upgrade pip setuptools wheel

echo ""
echo "[3/4] Installing Python dependencies..."
pip install -r requirements.txt --no-cache-dir

echo ""
echo "[4/4] Running migrations..."
python manage.py migrate --noinput

echo ""
echo "========================================="
echo "Backend build completed!"
echo "========================================="
