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
        ('Economic Sustainability', 'Questions about economic and financial sustainability', 4),
    ]
    
    cats = []
    for name, desc, order in categories:
        cat = Category.objects.create(name=name, description=desc, order=order)
        cats.append(cat)
        print(f"✓ Category '{name}' created")
    
    # Extended Questions
    questions_data = [
        # Environment Category
        (cats[0], 'Do you have a waste management program?', 1, [
            ('Yes, comprehensive program with recycling and reduction targets', 10),
            ('Yes, basic waste separation and disposal', 7),
            ('Partially, some waste management practices', 5),
            ('No formal waste management program', 0),
        ]),
        (cats[0], 'What is your renewable energy usage?', 2, [
            ('More than 75% renewable energy', 10),
            ('Between 50% and 75%', 8),
            ('Between 25% and 50%', 6),
            ('Between 10% and 25%', 3),
            ('Less than 10% or not using renewable energy', 0),
        ]),
        (cats[0], 'Do you measure and track your carbon footprint?', 3, [
            ('Yes, with third-party verification and reduction targets', 10),
            ('Yes, we measure and track internally', 7),
            ('We have basic measurements', 4),
            ('No, we do not measure carbon footprint', 0),
        ]),
        (cats[0], 'Water conservation practices in your company?', 4, [
            ('Comprehensive water management with recycling systems', 10),
            ('Water-saving technologies and monitoring', 7),
            ('Basic water conservation measures', 4),
            ('No specific water conservation practices', 0),
        ]),
        
        # Social Responsibility Category
        (cats[1], 'Do you have training programs for employees?', 1, [
            ('Comprehensive ongoing training and development programs', 10),
            ('Regular training sessions and skill development', 7),
            ('Occasional training programs', 4),
            ('No formal training programs', 0),
        ]),
        (cats[1], 'Employee diversity and inclusion policies?', 2, [
            ('Comprehensive D&I policies with measurable targets', 10),
            ('Established D&I policies and practices', 7),
            ('Basic diversity considerations', 4),
            ('No formal diversity policies', 0),
        ]),
        (cats[1], 'Community engagement and social impact?', 3, [
            ('Active community programs and partnerships', 10),
            ('Regular community involvement activities', 7),
            ('Occasional community support', 4),
            ('No community engagement programs', 0),
        ]),
        (cats[1], 'Employee health and safety measures?', 4, [
            ('Comprehensive health and safety program with certifications', 10),
            ('Good health and safety practices', 7),
            ('Basic safety measures', 4),
            ('Minimal health and safety considerations', 0),
        ]),
        
        # Corporate Governance Category
        (cats[2], 'Do you have an independent board of directors?', 1, [
            ('Fully independent board with diverse expertise', 10),
            ('Majority independent directors', 7),
            ('Some independent directors', 4),
            ('No independent directors', 0),
        ]),
        (cats[2], 'Transparency and reporting practices?', 2, [
            ('Comprehensive sustainability reporting with third-party verification', 10),
            ('Regular sustainability reports', 7),
            ('Basic reporting on sustainability metrics', 4),
            ('No formal sustainability reporting', 0),
        ]),
        (cats[2], 'Ethics and compliance programs?', 3, [
            ('Comprehensive ethics program with training and monitoring', 10),
            ('Established code of ethics and compliance procedures', 7),
            ('Basic ethical guidelines', 4),
            ('No formal ethics program', 0),
        ]),
        (cats[2], 'Stakeholder engagement practices?', 4, [
            ('Regular structured engagement with all stakeholder groups', 10),
            ('Good stakeholder communication and feedback systems', 7),
            ('Basic stakeholder communication', 4),
            ('Limited stakeholder engagement', 0),
        ]),
        
        # Economic Sustainability Category
        (cats[3], 'Long-term financial planning and sustainability?', 1, [
            ('Comprehensive long-term strategy with sustainability integration', 10),
            ('Good long-term planning with some sustainability considerations', 7),
            ('Basic long-term financial planning', 4),
            ('Short-term focused planning only', 0),
        ]),
        (cats[3], 'Supply chain sustainability practices?', 2, [
            ('Comprehensive supplier sustainability requirements and auditing', 10),
            ('Supplier sustainability guidelines and monitoring', 7),
            ('Basic supplier sustainability considerations', 4),
            ('No supplier sustainability requirements', 0),
        ]),
        (cats[3], 'Innovation and R&D investment in sustainability?', 3, [
            ('Significant R&D investment in sustainable technologies and practices', 10),
            ('Regular innovation projects focused on sustainability', 7),
            ('Some investment in sustainable innovation', 4),
            ('No specific sustainability innovation programs', 0),
        ]),
        (cats[3], 'Economic impact on local communities?', 4, [
            ('Strong positive economic impact with local sourcing and employment', 10),
            ('Good local economic contribution', 7),
            ('Some positive local economic impact', 4),
            ('Minimal local economic engagement', 0),
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
