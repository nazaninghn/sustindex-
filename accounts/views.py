from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import CompanyRegistrationForm, CompanyProfileForm
from .models import CompanyProfile

def register(request):
    if request.method == 'POST':
        form = CompanyRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('dashboard')
    else:
        form = CompanyRegistrationForm()
    return render(request, 'accounts/register.html', {'form': form})

@login_required
def profile_setup(request):
    try:
        profile = request.user.profile
    except CompanyProfile.DoesNotExist:
        profile = None
    
    if request.method == 'POST':
        form = CompanyProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.user = request.user
            profile.save()
            return redirect('dashboard')
    else:
        form = CompanyProfileForm(instance=profile)
    
    return render(request, 'accounts/profile_setup.html', {'form': form})

@login_required
def dashboard(request):
    # Calculate stats for dashboard
    completed_count = request.user.attempts.filter(is_completed=True).count()
    last_attempt = request.user.attempts.filter(is_completed=True).first()
    last_score = last_attempt.total_score if last_attempt else 0
    
    context = {
        'completed_count': completed_count,
        'last_score': last_score,
    }
    return render(request, 'accounts/dashboard.html', context)
