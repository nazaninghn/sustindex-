#!/usr/bin/env python
"""Quick import check for deployment"""
import sys

print("🔍 Checking critical imports...")

errors = []

# Check Django
try:
    import django
    print(f"✅ Django {django.get_version()}")
except ImportError as e:
    print(f"❌ Django: {e}")
    errors.append("Django")

# Check gunicorn
try:
    import gunicorn
    print(f"✅ gunicorn")
except ImportError as e:
    print(f"❌ gunicorn: {e}")
    errors.append("gunicorn")

# Check psycopg2
try:
    import psycopg2
    print(f"✅ psycopg2")
except ImportError as e:
    print(f"❌ psycopg2: {e}")
    errors.append("psycopg2")

# Check whitenoise
try:
    import whitenoise
    print(f"✅ whitenoise")
except ImportError as e:
    print(f"❌ whitenoise: {e}")
    errors.append("whitenoise")

# Check optional: dal
try:
    import dal
    import dal_select2
    print(f"✅ django-autocomplete-light (dal)")
except ImportError:
    print(f"⚠️  django-autocomplete-light (optional, not installed)")

# Check crispy forms
try:
    import crispy_forms
    import crispy_bootstrap5
    print(f"✅ crispy-forms")
except ImportError as e:
    print(f"❌ crispy-forms: {e}")
    errors.append("crispy-forms")

# Check ckeditor
try:
    import ckeditor
    print(f"✅ django-ckeditor")
except ImportError as e:
    print(f"❌ django-ckeditor: {e}")
    errors.append("ckeditor")

# Check import_export
try:
    import import_export
    print(f"✅ django-import-export")
except ImportError as e:
    print(f"❌ django-import-export: {e}")
    errors.append("import_export")

# Check simple_history
try:
    import simple_history
    print(f"✅ django-simple-history")
except ImportError as e:
    print(f"❌ django-simple-history: {e}")
    errors.append("simple_history")

print("\n" + "="*50)
if errors:
    print(f"❌ {len(errors)} critical packages missing!")
    print("Missing:", ", ".join(errors))
    sys.exit(1)
else:
    print("✅ All critical packages available!")
    sys.exit(0)
