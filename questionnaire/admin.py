from django.contrib import admin
from .models import Category, Question, Choice, QuestionnaireAttempt, Answer, UserDocument

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

class UserDocumentInline(admin.TabularInline):
    model = UserDocument
    extra = 0
    readonly_fields = ['title', 'file', 'uploaded_at', 'file_size']
    can_delete = False

class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0
    readonly_fields = ['question', 'choice', 'answered_at']
    can_delete = False
    inlines = [UserDocumentInline]

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

@admin.register(UserDocument)
class UserDocumentAdmin(admin.ModelAdmin):
    list_display = ['answer', 'title', 'uploaded_at', 'get_file_size_display']
    list_filter = ['uploaded_at']
    search_fields = ['title', 'answer__attempt__user__username']
    readonly_fields = ['uploaded_at', 'file_size']
