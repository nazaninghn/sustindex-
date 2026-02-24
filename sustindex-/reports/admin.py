from django.contrib import admin
from .models import Report, ReportSection

class ReportSectionInline(admin.TabularInline):
    model = ReportSection
    extra = 1
    fields = ['title', 'order']

@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'generated_at']
    list_filter = ['generated_at']
    search_fields = ['attempt__user__username']
    inlines = [ReportSectionInline]
    readonly_fields = ['generated_at']
