"""
Service functions for questionnaire calculations and statistics
"""
from django.db.models import Count, Q


def recalc_attempt_score(attempt):
    """
    محاسبه مجدد امتیاز کل یک attempt
    """
    from .models import Answer
    
    total = 0
    answers = attempt.answers.select_related('question').prefetch_related('choice')
    
    for answer in answers:
        if answer.choice:
            total += answer.choice.score
    
    attempt.total_score = total
    
    attempt.calculate_scores()
    
    return total


def attempt_stats(attempt):
    """
    محاسبه آمار پیشرفت یک attempt
    
    Returns:
        dict: {
            'total_questions': تعداد کل سوالات,
            'answered_questions': تعداد سوالات پاسخ داده شده,
            'cannot_answer_count': تعداد "نمی‌توانم پاسخ دهم",
            'progress_percent': درصد پیشرفت
        }
    """
    total_questions = attempt.answers.count()
    
    answered_questions = 0
    cannot_answer_count = 0
    
    for answer in attempt.answers.all():
        if answer.is_cannot_answer():
            cannot_answer_count += 1
        elif answer.choice or answer.choices.exists():
            answered_questions += 1
    
    progress_percent = 0
    if total_questions > 0:
        progress_percent = round(((answered_questions + cannot_answer_count) / total_questions) * 100)
    
    return {
        'total_questions': total_questions,
        'answered_questions': answered_questions,
        'cannot_answer_count': cannot_answer_count,
        'progress_percent': progress_percent,
    }


def get_category_performance(attempt):
    """
    محاسبه عملکرد در هر دسته‌بندی
    """
    from .models import Category
    
    categories = Category.objects.all()
    performance = []
    
    for category in categories:
        category_score = category.get_category_score(attempt)
        performance.append({
            'category': category.name,
            'score': category_score,
            'max_score': category.max_score,
            'percentage': round((category_score / category.max_score * 100) if category.max_score > 0 else 0, 1)
        })
    
    return performance
