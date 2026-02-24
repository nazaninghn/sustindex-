"""
URL configuration for sustindex project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from django.views.generic import TemplateView
from django.views.static import serve
import os

try:
    from questionnaire.autocomplete import CategoryAutocomplete
    AUTOCOMPLETE_AVAILABLE = CategoryAutocomplete is not None
except (ImportError, AttributeError):
    AUTOCOMPLETE_AVAILABLE = False
    CategoryAutocomplete = None

# Check if REST framework is installed
try:
    from sustindex.settings import REST_FRAMEWORK_INSTALLED
except ImportError:
    REST_FRAMEWORK_INSTALLED = False

# Admin panel settings
admin.site.site_header = "Sustindex Admin Panel"
admin.site.site_title = "Sustindex Admin"
admin.site.index_title = "Welcome to Sustindex Admin"

# Serve Next.js frontend
def serve_frontend(request, path=''):
    """Serve Next.js static files"""
    frontend_dir = settings.FRONTEND_BUILD_DIR
    
    # Serve index.html for root and routes
    if not path or not os.path.exists(os.path.join(frontend_dir, path)):
        path = 'index.html'
    
    return serve(request, path, document_root=frontend_dir)

# URLs without language prefix
urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
]

# Add API routes only if REST framework is installed
if REST_FRAMEWORK_INSTALLED:
    urlpatterns.append(path('api/v1/', include('api_urls')))

# Add autocomplete URL only if available
if AUTOCOMPLETE_AVAILABLE:
    urlpatterns.append(
        path('autocomplete/category/', CategoryAutocomplete.as_view(), name='category-autocomplete')
    )

# URLs with language prefix (Admin only - Frontend is Next.js)
urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
)

# Serve Next.js static files
urlpatterns += [
    re_path(r'^_next/(?P<path>.*)$', serve_frontend),
    re_path(r'^(?P<path>.*)$', serve_frontend),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
