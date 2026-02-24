from django.contrib import admin
from .models import Course, Lesson, LessonAttachment, LessonProgress

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 1
    fields = ['title', 'order', 'duration_minutes']

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'company__company_name']
    inlines = [LessonInline]

class LessonAttachmentInline(admin.TabularInline):
    model = LessonAttachment
    extra = 1

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'order', 'duration_minutes']
    list_filter = ['course']
    search_fields = ['title']
    inlines = [LessonAttachmentInline]

@admin.register(LessonProgress)
class LessonProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'lesson', 'is_completed', 'completed_at']
    list_filter = ['is_completed']
    search_fields = ['user__username', 'lesson__title']
