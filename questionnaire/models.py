from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    """Question categories for organizing questionnaire"""
    name = models.CharField(max_length=200, verbose_name=_('Name'))
    description = models.TextField(blank=True, verbose_name=_('Description'))
    order = models.IntegerField(default=0, verbose_name=_('Display Order'))
    
    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name


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
