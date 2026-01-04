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
        # Process form data
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
        
        # Process uploaded files (if any)
        for key, files in request.FILES.lists():
            if key.startswith('files_'):
                question_id = int(key.split('_')[1])
                question = Question.objects.get(id=question_id)
                
                # Get or create answer for this question
                try:
                    answer = Answer.objects.get(attempt=attempt, question=question)
                except Answer.DoesNotExist:
                    # Create placeholder answer with first choice if no answer exists
                    first_choice = question.choices.first()
                    answer = Answer.objects.create(
                        attempt=attempt,
                        question=question,
                        choice=first_choice
                    )
                
                # Save uploaded files
                for file in files:
                    if file.size <= 10 * 1024 * 1024:  # 10MB limit
                        UserDocument.objects.create(
                            answer=answer,
                            title=file.name,
                            file=file,
                            file_size=file.size
                        )
        
        attempt.is_completed = True
        attempt.completed_at = timezone.now()
        attempt.calculate_score()
        attempt.save()
        
        return redirect('questionnaire_result', attempt_id=attempt.id)
    
    # Get existing answers and documents for display
    existing_answers = {}
    existing_documents = {}
    
    for answer in attempt.answers.all():
        existing_answers[answer.question.id] = answer.choice.id
        documents = answer.documents.all()
        if documents:
            existing_documents[answer.question.id] = documents
    
    return render(request, 'questionnaire/questionnaire.html', {
        'attempt': attempt,
        'categories': categories,
        'existing_answers': existing_answers,
        'existing_documents': existing_documents
    })

@login_required
def questionnaire_result(request, attempt_id):
    attempt = get_object_or_404(QuestionnaireAttempt, id=attempt_id, user=request.user)
    
    # محاسبه امتیازات ESG
    esg_scores = attempt.calculate_esg_scores()
    
    # تولید گزارش اگر وجود نداشته باشد
    from reports.models import Report
    report, created = Report.objects.get_or_create(
        attempt=attempt,
        defaults={'generated_at': timezone.now()}
    )
    
    # محاسبه تعداد فایل‌های آپلود شده
    documents_count = 0
    for answer in attempt.answers.all():
        documents_count += answer.documents.count()
    
    # اضافه کردن تعداد فایل‌ها به attempt برای استفاده در template
    attempt.documents_count = documents_count
    
    context = {
        'attempt': attempt,
        'esg_scores': esg_scores,
        'report': report,
        'recommendations': attempt.get_recommendations(),
        'documents_count': documents_count,
    }
    
    return render(request, 'questionnaire/result.html', context)

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
            
            # Validate file type
            allowed_types = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'image/jpeg',
                'image/jpg',
                'image/png'
            ]
            
            if uploaded_file.content_type not in allowed_types:
                return JsonResponse({'success': False, 'error': 'File type not supported'})
            
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
                title=title or uploaded_file.name,
                file=uploaded_file,
                file_size=uploaded_file.size
            )
            
            return JsonResponse({
                'success': True,
                'document_id': document.id,
                'file_name': uploaded_file.name,
                'file_size': document.get_file_size_display(),
                'file_url': document.file.url if document.file else None
            })
            
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'})

@login_required
def delete_document(request, document_id):
    """Delete uploaded document"""
    if request.method == 'POST':
        try:
            document = get_object_or_404(UserDocument, id=document_id, answer__attempt__user=request.user)
            document.delete()
            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    
    return JsonResponse({'success': False, 'error': 'Invalid request method'})
