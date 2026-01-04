from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    """Question categories for organizing questionnaire"""
    name = models.CharField(max_length=200, verbose_name=_('Name'))
    description = models.TextField(blank=True, verbose_name=_('Description'))
    order = models.IntegerField(default=0, verbose_name=_('Display Order'))
    # اضافه کردن وزن برای محاسبه امتیاز ESG
    environmental_weight = models.FloatField(default=0.0, verbose_name=_('Environmental Weight'))
    social_weight = models.FloatField(default=0.0, verbose_name=_('Social Weight'))
    governance_weight = models.FloatField(default=0.0, verbose_name=_('Governance Weight'))
    max_score = models.IntegerField(default=100, verbose_name=_('Maximum Score'))
    
    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name
    
    def get_category_score(self, attempt):
        """محاسبه امتیاز دسته‌بندی برای یک attempt"""
        questions = self.questions.filter(is_active=True)
        if not questions.exists():
            return 0
        
        total_score = 0
        total_possible = 0
        
        for question in questions:
            answer = attempt.answers.filter(question=question).first()
            if answer:
                total_score += answer.choice.score
                max_choice_score = question.choices.aggregate(models.Max('score'))['score__max'] or 0
                total_possible += max_choice_score
        
        if total_possible == 0:
            return 0
        
        # تبدیل به درصد از حداکثر امتیاز دسته‌بندی
        percentage = (total_score / total_possible) * 100
        return min(percentage, self.max_score)


class Question(models.Model):
    """Questionnaire questions"""
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='questions', verbose_name=_('Category'))
    text = RichTextField(verbose_name=_('Question Text'))
    order = models.IntegerField(default=0, verbose_name=_('Display Order'))
    is_active = models.BooleanField(default=True, verbose_name=_('Active'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Created At'))
    # اضافه کردن قابلیت آپلود فایل برای سوال
    attachment = models.FileField(upload_to='question_attachments/', blank=True, verbose_name=_('Question Attachment'))
    
    class Meta:
        verbose_name = _('Question')
        verbose_name_plural = _('Questions')
        ordering = ['category', 'order']
    
    def __str__(self):
        return f"{self.category.name} - Question {self.order}"


class Choice(models.Model):
    """Answer choices for each question"""
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices', verbose_name=_('Question'))
    text = models.CharField(max_length=500, verbose_name=_('Choice Text'))
    score = models.IntegerField(default=0, verbose_name=_('Score'))
    order = models.IntegerField(default=0, verbose_name=_('Display Order'))
    
    class Meta:
        verbose_name = _('Choice')
        verbose_name_plural = _('Choices')
        ordering = ['order']
    
    def __str__(self):
        return f"{self.text} (Score: {self.score})"


class QuestionnaireAttempt(models.Model):
    """User attempts to complete questionnaire"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='attempts', verbose_name=_('User'))
    started_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Started At'))
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name=_('Completed At'))
    is_completed = models.BooleanField(default=False, verbose_name=_('Completed'))
    total_score = models.IntegerField(default=0, verbose_name=_('Total Score'))
    
    # اضافه کردن امتیازات ESG جداگانه
    environmental_score = models.FloatField(default=0.0, verbose_name=_('Environmental Score'))
    social_score = models.FloatField(default=0.0, verbose_name=_('Social Score'))
    governance_score = models.FloatField(default=0.0, verbose_name=_('Governance Score'))
    esg_grade = models.CharField(max_length=2, blank=True, verbose_name=_('ESG Grade'))
    
    class Meta:
        verbose_name = _('Questionnaire Attempt')
        verbose_name_plural = _('Questionnaire Attempts')
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.started_at.strftime('%Y-%m-%d')}"
    
    def calculate_score(self):
        """Calculate total score from all answers"""
        total = sum(answer.choice.score for answer in self.answers.all())
        self.total_score = total
        self.save()
        return total
    
    def calculate_esg_scores(self):
        """محاسبه امتیازات ESG جداگانه"""
        categories = Category.objects.all()
        
        env_score = 0
        social_score = 0
        gov_score = 0
        
        for category in categories:
            category_score = category.get_category_score(self)
            
            # توزیع امتیاز بر اساس وزن‌های تعریف شده
            env_score += category_score * category.environmental_weight
            social_score += category_score * category.social_weight  
            gov_score += category_score * category.governance_weight
        
        self.environmental_score = round(env_score, 2)
        self.social_score = round(social_score, 2)
        self.governance_score = round(gov_score, 2)
        
        # محاسبه نمره کل ESG (میانگین وزنی)
        total_esg = (self.environmental_score + self.social_score + self.governance_score) / 3
        self.total_score = round(total_esg, 2)
        
        # تعیین گرید ESG
        self.esg_grade = self.get_esg_grade()
        
        self.save()
        return {
            'environmental': self.environmental_score,
            'social': self.social_score,
            'governance': self.governance_score,
            'total': self.total_score,
            'grade': self.esg_grade
        }
    
    def get_esg_grade(self):
        """تعیین گرید ESG بر اساس امتیاز کل"""
        if self.total_score >= 80:
            return 'A+'
        elif self.total_score >= 70:
            return 'A'
        elif self.total_score >= 60:
            return 'B+'
        elif self.total_score >= 50:
            return 'B'
        elif self.total_score >= 40:
            return 'C+'
        elif self.total_score >= 30:
            return 'C'
        else:
            return 'D'
    
    def get_recommendations(self):
        """ارائه پیشنهادات بر اساس امتیازات"""
        recommendations = []
        
        if self.environmental_score < 50:
            recommendations.append({
                'category': 'Environmental',
                'priority': 'High',
                'suggestion': 'Focus on waste management and renewable energy adoption'
            })
        
        if self.social_score < 50:
            recommendations.append({
                'category': 'Social',
                'priority': 'High', 
                'suggestion': 'Improve employee training and diversity programs'
            })
        
        if self.governance_score < 50:
            recommendations.append({
                'category': 'Governance',
                'priority': 'High',
                'suggestion': 'Strengthen board independence and transparency reporting'
            })
        
        return recommendations


class Answer(models.Model):
    """User answers to questions"""
    attempt = models.ForeignKey(QuestionnaireAttempt, on_delete=models.CASCADE, related_name='answers', verbose_name=_('Attempt'))
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name=_('Question'))
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE, verbose_name=_('Selected Choice'))
    answered_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Answered At'))
    
    class Meta:
        verbose_name = _('Answer')
        verbose_name_plural = _('Answers')
        unique_together = ['attempt', 'question']
    
    def __str__(self):
        return f"{self.attempt.user.username} - {self.question}"


class UserDocument(models.Model):
    """User uploaded documents for questions"""
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name='documents', verbose_name=_('Answer'))
    title = models.CharField(max_length=200, verbose_name=_('Document Title'))
    file = models.FileField(upload_to='user_documents/', verbose_name=_('Document File'))
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Uploaded At'))
    file_size = models.IntegerField(default=0, verbose_name=_('File Size (bytes)'))
    
    class Meta:
        verbose_name = _('User Document')
        verbose_name_plural = _('User Documents')
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.answer.attempt.user.username} - {self.title}"
    
    def get_file_size_display(self):
        """Return human readable file size"""
        if self.file_size < 1024:
            return f"{self.file_size} B"
        elif self.file_size < 1024 * 1024:
            return f"{self.file_size // 1024} KB"
        else:
            return f"{self.file_size // (1024 * 1024)} MB"
