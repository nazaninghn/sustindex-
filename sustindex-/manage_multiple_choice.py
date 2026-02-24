#!/usr/bin/env python
"""
Manage multiple choice settings for questions
Run: python manage.py shell < manage_multiple_choice.py
Or: python manage_multiple_choice.py
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from questionnaire.models import Question, Category

def show_questions():
    """Show all questions with their multiple choice status"""
    questions = Question.objects.all().order_by('category', 'order')
    
    print("\n" + "="*80)
    print("ALL QUESTIONS")
    print("="*80)
    
    current_category = None
    for q in questions:
        if current_category != q.category:
            current_category = q.category
            print(f"\n📁 {current_category.name}")
            print("-" * 80)
        
        status = "✅ Multiple" if q.allow_multiple else "❌ Single"
        print(f"  {q.id:3d}. {status} | {q.text[:60]}...")

def enable_all():
    """Enable multiple choice for ALL questions"""
    count = Question.objects.update(allow_multiple=True)
    print(f"\n✅ Enabled multiple choice for {count} questions")

def disable_all():
    """Disable multiple choice for ALL questions"""
    count = Question.objects.update(allow_multiple=False)
    print(f"\n❌ Disabled multiple choice for {count} questions")

def enable_by_category(category_name):
    """Enable multiple choice for questions in a specific category"""
    try:
        category = Category.objects.get(name__icontains=category_name)
        count = Question.objects.filter(category=category).update(allow_multiple=True)
        print(f"\n✅ Enabled multiple choice for {count} questions in '{category.name}'")
    except Category.DoesNotExist:
        print(f"\n❌ Category '{category_name}' not found")

def enable_by_ids(question_ids):
    """Enable multiple choice for specific question IDs"""
    count = Question.objects.filter(id__in=question_ids).update(allow_multiple=True)
    print(f"\n✅ Enabled multiple choice for {count} questions")

def disable_by_ids(question_ids):
    """Disable multiple choice for specific question IDs"""
    count = Question.objects.filter(id__in=question_ids).update(allow_multiple=False)
    print(f"\n❌ Disabled multiple choice for {count} questions")

def interactive_menu():
    """Interactive menu for managing multiple choice"""
    while True:
        print("\n" + "="*80)
        print("MULTIPLE CHOICE MANAGEMENT")
        print("="*80)
        print("1. Show all questions")
        print("2. Enable multiple choice for ALL questions")
        print("3. Disable multiple choice for ALL questions")
        print("4. Enable for specific category")
        print("5. Enable for specific question IDs")
        print("6. Disable for specific question IDs")
        print("0. Exit")
        print("="*80)
        
        choice = input("\nEnter your choice: ").strip()
        
        if choice == '1':
            show_questions()
        elif choice == '2':
            confirm = input("Are you sure? (yes/no): ").strip().lower()
            if confirm == 'yes':
                enable_all()
        elif choice == '3':
            confirm = input("Are you sure? (yes/no): ").strip().lower()
            if confirm == 'yes':
                disable_all()
        elif choice == '4':
            category_name = input("Enter category name: ").strip()
            enable_by_category(category_name)
        elif choice == '5':
            ids_str = input("Enter question IDs (comma-separated): ").strip()
            ids = [int(x.strip()) for x in ids_str.split(',') if x.strip().isdigit()]
            if ids:
                enable_by_ids(ids)
            else:
                print("❌ No valid IDs provided")
        elif choice == '6':
            ids_str = input("Enter question IDs (comma-separated): ").strip()
            ids = [int(x.strip()) for x in ids_str.split(',') if x.strip().isdigit()]
            if ids:
                disable_by_ids(ids)
            else:
                print("❌ No valid IDs provided")
        elif choice == '0':
            print("\nGoodbye!")
            break
        else:
            print("\n❌ Invalid choice")

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == 'show':
            show_questions()
        elif command == 'enable-all':
            enable_all()
        elif command == 'disable-all':
            disable_all()
        elif command == 'enable-category' and len(sys.argv) > 2:
            enable_by_category(sys.argv[2])
        else:
            print("Usage:")
            print("  python manage_multiple_choice.py show")
            print("  python manage_multiple_choice.py enable-all")
            print("  python manage_multiple_choice.py disable-all")
            print("  python manage_multiple_choice.py enable-category 'Category Name'")
    else:
        interactive_menu()
