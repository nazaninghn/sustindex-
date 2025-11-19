from django.contrib import admin
from .models import Category, Question, Choice, QuestionnaireAttempt, Answer

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 4
    fields = ['text', 'score', 'order']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'order']
    search_fields = ['name']
    ordering = ['order']

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['category', 'order', 'is_active', 'created_at']
    list_filter = ['category', 'is_active']
    search_fields = ['text']
    inlines = [ChoiceInline]
    ordering = ['category', 'order']

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0
    readonly_fields = ['question', 'choice', 'answered_at']
    can_delete = False

@admin.register(QuestionnaireAttempt)
class QuestionnaireAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'started_at', 'completed_at', 'is_completed', 'total_score']
    list_filter = ['is_completed', 'started_at']
    search_fields = ['user__username', 'user__company_name']
    readonly_fields = ['started_at', 'total_score']
    inlines = [AnswerInline]
    
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        if obj.is_completed:
            obj.calculate_score()
