from django.urls import path
from . import views

urlpatterns = [
    path('generate/<int:attempt_id>/', views.generate_report, name='generate_report'),
    path('view/<int:report_id>/', views.view_report, name='view_report'),
    path('download/<int:report_id>/', views.download_report_pdf, name='download_report_pdf'),
    path('dashboard/', views.reports_dashboard, name='reports_dashboard'),
]