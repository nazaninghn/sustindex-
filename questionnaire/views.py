from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Category, Question, QuestionnaireAttempt, Answer

@login_required
def start_questionnaire(request):
    # بررسی محدودیت‌های عضویت
    user = request.user
    attempts_count = QuestionnaireAttempt.objects.filter(user=user, is_completed=True).count()
    
    if user.membership_type == 'silver' and attempts_count >= 1:
        return render(request, 'questionnaire/limit_reached.html')
    
    # ایجاد تلاش جدید
    attempt = QuestionnaireAttempt.objects.create(user=user)
    return redirect('questionnaire_page', attempt_id=attempt.id)

@login_required
def questionnaire_page(request, attempt_id):
    attempt = get_object_or_404(QuestionnaireAttempt, id=attempt_id, user=request.user)
    
    if attempt.is_completed:
        return redirect('questionnaire_result', attempt_id=attempt.id)
    
    categories = Category.objects.prefetch_related('questions__choices').all()
    
    if request.method == 'POST':
        for question_id, choice_id in request.POST.items():
            if question_id.startswith('question_'):
                q_id = int(question_id.split('_')[1])
                question = Question.objects.get(id=q_id)
                choice = question.choices.get(id=int(choice_id))
                
                Answer.objects.update_or_create(
                    attempt=attempt,
                    question=question,
                    defaults={'choice': choice}
                )
        
        attempt.is_completed = True
        attempt.completed_at = timezone.now()
        attempt.calculate_score()
        attempt.save()
        
        return redirect('questionnaire_result', attempt_id=attempt.id)
    
    return render(request, 'questionnaire/questionnaire.html', {
        'attempt': attempt,
        'categories': categories
    })

@login_required
def questionnaire_result(request, attempt_id):
    attempt = get_object_or_404(QuestionnaireAttempt, id=attempt_id, user=request.user)
    return render(request, 'questionnaire/result.html', {'attempt': attempt})
