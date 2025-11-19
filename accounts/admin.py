from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, CompanyProfile, MembershipHistory

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'company_name', 'membership_type', 'created_at']
    list_filter = ['membership_type', 'is_staff', 'created_at']
    search_fields = ['username', 'email', 'company_name']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Company Information', {'fields': ('membership_type', 'company_name', 'phone')}),
    )

@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    list_display = ['company_name', 'user', 'industry', 'employee_count']
    search_fields = ['company_name', 'registration_number']
    list_filter = ['industry']

@admin.register(MembershipHistory)
class MembershipHistoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'membership_type', 'start_date', 'is_active']
    list_filter = ['membership_type', 'is_active']
    search_fields = ['user__username']
