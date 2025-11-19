from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, CompanyProfile

class CompanyRegistrationForm(UserCreationForm):
    company_name = forms.CharField(max_length=200, label='Company Name')
    email = forms.EmailField(label='Email')
    phone = forms.CharField(max_length=20, label='Phone')
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'company_name', 'phone']

class CompanyProfileForm(forms.ModelForm):
    class Meta:
        model = CompanyProfile
        fields = ['company_name', 'registration_number', 'address', 'website', 
                  'industry', 'employee_count', 'logo']
