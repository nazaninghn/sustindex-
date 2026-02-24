#!/usr/bin/env python
"""
Add notes field to Answer model
Run: python add_notes_field.py
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from django.db import connection

def add_notes_field():
    """Add notes field to questionnaire_answer table"""
    
    with connection.cursor() as cursor:
        # Check if field already exists
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='questionnaire_answer' AND column_name='notes'
        """)
        
        if cursor.fetchone():
            print("✅ Field 'notes' already exists!")
            return
        
        # Add the field
        print("Adding 'notes' field to Answer model...")
        cursor.execute("""
            ALTER TABLE questionnaire_answer 
            ADD COLUMN notes TEXT NULL
        """)
        
        print("✅ Successfully added 'notes' field!")
        print("Users can now add text notes to their answers.")

if __name__ == '__main__':
    try:
        add_notes_field()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nTrying alternative method...")
        print("Please run: python manage.py makemigrations")
        print("Then run: python manage.py migrate")
