"""
Initial project setup script
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import CompanyProfile
from questionnaire.models import Category, Question, Choice

User = get_user_model()

def create_superuser():
    """Create superuser account"""
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser(
            username='admin',
            email='admin@sustindex.com',
            password='admin123',
            company_name='System Administration'
        )
        print("✓ Superuser created (username: admin, password: admin123)")
    else:
        print("✓ Superuser already exists")

def create_sample_users():
    """Create sample user accounts"""
    users_data = [
        ('company_free', 'free@example.com', 'Sample Free Company', 'free'),
        ('company_silver', 'silver@example.com', 'Sample Silver Company', 'silver'),
        ('company_gold', 'gold@example.com', 'Sample Gold Company', 'gold'),
    ]
    
    for username, email, company_name, membership in users_data:
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(
                username=username,
                email=email,
                password='test1234',
                company_name=company_name,
                membership_type=membership
            )
            print(f"✓ User {username} created")

def create_sample_questions():
    """Create sample questions and categories"""
    if Category.objects.exists():
        print("✓ Sample questions already exist")
        return
    
    # Categories
    categories = [
        ('Environment', 'Questions about environmental impact', 1),
        ('Social Responsibility', 'Questions about corporate social responsibility', 2),
        ('Corporate Governance', 'Questions about management structure and governance', 3),
    ]
    
    cats = []
    for name, desc, order in categories:
        cat = Category.objects.create(name=name, description=desc, order=order)
        cats.append(cat)
        print(f"✓ Category '{name}' created")
    
    # Questions
    questions_data = [
        (cats[0], 'Do you have a waste management program?', 1, [
            ('Yes, comprehensive program', 10),
            ('Partially', 5),
            ('No', 0),
        ]),
        (cats[0], 'What is your renewable energy usage?', 2, [
            ('More than 50%', 10),
            ('Between 20% and 50%', 7),
            ('Less than 20%', 3),
            ('Not using at all', 0),
        ]),
        (cats[1], 'Do you have training programs for employees?', 1, [
            ('Yes, regularly', 10),
            ('Sometimes', 5),
            ('No', 0),
        ]),
        (cats[2], 'Do you have an independent board of directors?', 1, [
            ('Yes, completely independent', 10),
            ('Partially', 5),
            ('No', 0),
        ]),
    ]
    
    for cat, text, order, choices in questions_data:
        q = Question.objects.create(category=cat, text=text, order=order, is_active=True)
        for idx, (choice_text, score) in enumerate(choices, 1):
            Choice.objects.create(question=q, text=choice_text, score=score, order=idx)
        print(f"✓ Question '{text[:50]}...' created with {len(choices)} choices")

def main():
    print("=" * 60)
    print("Sustindex Project Initial Setup")
    print("=" * 60)
    
    print("\n1. Creating Superuser...")
    create_superuser()
    
    print("\n2. Creating Sample Users...")
    create_sample_users()
    
    print("\n3. Creating Sample Questions...")
    create_sample_questions()
    
    print("\n" + "=" * 60)
    print("✓ Setup completed successfully!")
    print("=" * 60)
    print("\nLogin Information:")
    print("  Admin Panel: http://127.0.0.1:8000/en/admin/")
    print("  Username: admin")
    print("  Password: admin123")
    print("\nSample Users:")
    print("  - company_free / test1234 (Free)")
    print("  - company_silver / test1234 (Silver)")
    print("  - company_gold / test1234 (Gold)")
    print("\nTo run the server:")
    print("  python manage.py runserver")
    print("=" * 60)

if __name__ == '__main__':
    main()
