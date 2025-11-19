"""
Update questions to English
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from questionnaire.models import Category, Question, Choice

# Delete old Persian questions
Question.objects.all().delete()
Category.objects.all().delete()

# Create English categories
categories_data = [
    ('Environment', 'Questions about environmental impact', 1),
    ('Social Responsibility', 'Questions about corporate social responsibility', 2),
    ('Corporate Governance', 'Questions about management structure and governance', 3),
]

cats = []
for name, desc, order in categories_data:
    cat = Category.objects.create(name=name, description=desc, order=order)
    cats.append(cat)
    print(f"✓ Category '{name}' created")

# Create English questions
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
    print(f"✓ Question '{text}' created with {len(choices)} choices")

print("\n✓ All questions updated to English!")
