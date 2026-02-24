"""
Script to add more questions to existing database
Run this after deployment to add additional questions
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from questionnaire.models import Category, Question, Choice

def add_more_questions():
    """Add additional questions to existing categories"""
    
    # Get existing categories
    try:
        env_cat = Category.objects.get(name='Environment')
        social_cat = Category.objects.get(name='Social Responsibility')
        gov_cat = Category.objects.get(name='Corporate Governance')
    except Category.DoesNotExist:
        print("❌ Categories not found. Please run setup.py first.")
        return
    
    # Additional questions to add
    new_questions = [
        # Environment
        (env_cat, 'Do you have environmental certifications (ISO 14001, etc.)?', 5, [
            ('Yes, multiple environmental certifications', 10),
            ('Yes, one environmental certification', 7),
            ('In process of obtaining certification', 4),
            ('No environmental certifications', 0),
        ]),
        (env_cat, 'Green building and sustainable facilities?', 6, [
            ('LEED/BREEAM certified green buildings', 10),
            ('Energy-efficient buildings with sustainable features', 7),
            ('Some green building practices', 4),
            ('No specific green building initiatives', 0),
        ]),
        
        # Social Responsibility
        (social_cat, 'Fair labor practices and worker rights?', 5, [
            ('Comprehensive fair labor policies with third-party auditing', 10),
            ('Strong labor practices and worker protection', 7),
            ('Basic worker rights protection', 4),
            ('Minimal labor practice considerations', 0),
        ]),
        (social_cat, 'Product safety and quality standards?', 6, [
            ('Rigorous quality control with international certifications', 10),
            ('Good quality assurance processes', 7),
            ('Basic quality control measures', 4),
            ('Minimal quality standards', 0),
        ]),
        
        # Corporate Governance
        (gov_cat, 'Risk management and crisis preparedness?', 5, [
            ('Comprehensive risk management with regular assessments', 10),
            ('Good risk identification and mitigation processes', 7),
            ('Basic risk management procedures', 4),
            ('Limited risk management practices', 0),
        ]),
        (gov_cat, 'Data privacy and cybersecurity measures?', 6, [
            ('Comprehensive data protection with certifications (ISO 27001)', 10),
            ('Strong cybersecurity and privacy policies', 7),
            ('Basic data protection measures', 4),
            ('Minimal cybersecurity considerations', 0),
        ]),
    ]
    
    questions_added = 0
    for cat, text, order, choices in new_questions:
        # Check if question already exists
        if not Question.objects.filter(category=cat, text=text).exists():
            q = Question.objects.create(category=cat, text=text, order=order, is_active=True)
            for idx, (choice_text, score) in enumerate(choices, 1):
                Choice.objects.create(question=q, text=choice_text, score=score, order=idx)
            print(f"✓ Added question: '{text[:50]}...' with {len(choices)} choices")
            questions_added += 1
        else:
            print(f"⚠️ Question already exists: '{text[:50]}...'")
    
    print(f"\n✅ Added {questions_added} new questions successfully!")

def list_all_questions():
    """List all existing questions"""
    print("\n📋 Current Questions in Database:")
    print("=" * 60)
    
    for category in Category.objects.all():
        print(f"\n📂 {category.name}")
        questions = Question.objects.filter(category=category, is_active=True)
        for q in questions:
            print(f"   {q.order}. {q.text[:60]}...")
            choices = q.choices.all()
            for c in choices:
                print(f"      - {c.text} (Score: {c.score})")
    
    total_questions = Question.objects.filter(is_active=True).count()
    print(f"\n📊 Total Active Questions: {total_questions}")

def main():
    print("=" * 60)
    print("Sustindex - Add More Questions")
    print("=" * 60)
    
    print("\n1. Current Questions:")
    list_all_questions()
    
    print("\n2. Adding New Questions:")
    add_more_questions()
    
    print("\n3. Updated Questions List:")
    list_all_questions()
    
    print("\n" + "=" * 60)
    print("✅ Question management completed!")
    print("=" * 60)

if __name__ == '__main__':
    main()