"""
Setup ESG weights for categories
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sustindex.settings')
django.setup()

from questionnaire.models import Category

def setup_esg_weights():
    """Setup ESG weights for categories"""
    
    category_weights = {
        'Environment': {
            'environmental_weight': 1.0,  # 100% environmental
            'social_weight': 0.0,
            'governance_weight': 0.0,
            'max_score': 100
        },
        'Social Responsibility': {
            'environmental_weight': 0.0,
            'social_weight': 1.0,  # 100% social
            'governance_weight': 0.0,
            'max_score': 100
        },
        'Corporate Governance': {
            'environmental_weight': 0.0,
            'social_weight': 0.0,
            'governance_weight': 1.0,  # 100% governance
            'max_score': 100
        },
        'Economic Sustainability': {
            'environmental_weight': 0.3,  # 30% environmental
            'social_weight': 0.3,         # 30% social
            'governance_weight': 0.4,     # 40% governance
            'max_score': 100
        }
    }
    
    print("Setting up ESG weights for categories...")
    
    for category_name, weights in category_weights.items():
        try:
            category = Category.objects.get(name=category_name)
            category.environmental_weight = weights['environmental_weight']
            category.social_weight = weights['social_weight']
            category.governance_weight = weights['governance_weight']
            category.max_score = weights['max_score']
            category.save()
            
            print(f"✓ Updated weights for '{category_name}'")
            print(f"  - Environmental: {weights['environmental_weight']}")
            print(f"  - Social: {weights['social_weight']}")
            print(f"  - Governance: {weights['governance_weight']}")
            print()
            
        except Category.DoesNotExist:
            print(f"✗ Category '{category_name}' not found")
    
    print("ESG weights setup completed!")

if __name__ == '__main__':
    setup_esg_weights()