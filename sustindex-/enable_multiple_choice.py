#!/usr/bin/env python
"""
Enable multiple choice for all questions
Run: python manage.py shell < enable_multiple_choice.py
Or: python enable_multiple_choice.py
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from questionnaire.models import Question

def enable_multiple_choice():
    """Enable allow_multiple for all questions"""
    
    # Get all questions
    questions = Question.objects.all()
    total = questions.count()
    
    print(f"Found {total} questions")
    print("Enabling multiple choice for all questions...")
    
    # Update all questions
    updated = questions.update(allow_multiple=True)
    
    print(f"✅ Successfully updated {updated} questions")
    print("All questions now support multiple choice selection!")
    
    # Show some examples
    print("\nExample questions:")
    for q in questions[:5]:
        print(f"  - {q.text[:50]}... (allow_multiple={q.allow_multiple})")

if __name__ == '__main__':
    enable_multiple_choice()
