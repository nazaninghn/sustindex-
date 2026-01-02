from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import json
from .models import Category, Question, QuestionnaireAttempt, Answer, UserDocument

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
                
                answer, created = Answer.objects.update_or_create(
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

@login_required
@csrf_exempt
def upload_document(request):
    """AJAX endpoint for uploading user documents"""
    if request.method == 'POST':
        try:
            attempt_id = request.POST.get('attempt_id')
            question_id = request.POST.get('question_id')
            title = request.POST.get('title', 'Supporting Document')
            uploaded_file = request.FILES.get('file')
            
            if not all([attempt_id, question_id, uploaded_file]):
                return JsonResponse({'success': False, 'error': 'Missing required fields'})
            
            # Validate file size (max 10MB)
            if uploaded_file.size > 10 * 1024 * 1024:
                return JsonResponse({'success': False, 'error': 'File size too large (max 10MB)'})
            
            # Get or create answer
            attempt = get_object_or_404(QuestionnaireAttempt, id=attempt_id, user=request.user)
            question = get_object_or_404(Question, id=question_id)
            
            # Find existing answer or create placeholder
            try:
                answer = Answer.objects.get(attempt=attempt, question=question)
            except Answer.DoesNotExist:
                # Create placeholder answer with first choice
                first_choice = question.choices.first()
                answer = Answer.objects.create(
                    attempt=attempt,
                    question=question,
                    choice=first_choice
                )
            
            # Create document
            document = UserDocument.objects.create(
                answer=answer,
                title=title,
                file=uploaded_file,
                file_size=uploaded_file.size
            )
            
            return JsonResponse({
                'success': True,
                'document_id': document.id,
                'file_name': uploaded_file.name,
                'file_size': document.get_file_size_display()
            })
            
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'})
