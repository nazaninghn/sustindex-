from django.urls import path
from . import views

urlpatterns = [
    path('start/', views.start_questionnaire, name='start_questionnaire'),
    path('<int:attempt_id>/', views.questionnaire_page, name='questionnaire_page'),
    path('<int:attempt_id>/result/', views.questionnaire_result, name='questionnaire_result'),
    path('upload-document/', views.upload_document, name='upload_document'),
]
