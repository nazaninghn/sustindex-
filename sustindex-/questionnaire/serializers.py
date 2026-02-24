from rest_framework import serializers
from .models import (
    Survey, SurveySession, Category, Question, Choice, 
    QuestionnaireAttempt, Answer, UserDocument
)


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'score', 'order']


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Question
        fields = ['id', 'survey', 'category', 'category_name', 'text', 
                  'order', 'is_active', 'allow_multiple', 'attachment', 'choices']


class CategorySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'order', 
                  'environmental_weight', 'social_weight', 'governance_weight', 
                  'max_score', 'questions']


class SurveySessionSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source='get_status_display', read_only=True)
    is_open = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = SurveySession
        fields = ['id', 'survey', 'name', 'description', 'start_date', 
                  'end_date', 'is_active', 'status', 'is_open', 'created_at']


class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    sessions = SurveySessionSerializer(many=True, read_only=True)
    total_questions = serializers.IntegerField(source='get_total_questions', read_only=True)
    
    class Meta:
        model = Survey
        fields = ['id', 'name', 'description', 'is_active', 'created_at', 
                  'updated_at', 'allow_multiple_attempts', 'show_results_immediately',
                  'total_questions', 'questions', 'sessions']


class UserDocumentSerializer(serializers.ModelSerializer):
    file_size_display = serializers.CharField(source='get_file_size_display', read_only=True)
    
    class Meta:
        model = UserDocument
        fields = ['id', 'title', 'description', 'file', 'uploaded_at', 'file_size', 'file_size_display']


class AnswerSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(source='question.text', read_only=True)
    choice_text = serializers.CharField(source='choice.text', read_only=True)
    choices_display = serializers.CharField(source='get_selected_choices_display', read_only=True)
    documents = UserDocumentSerializer(many=True, read_only=True)
    total_score = serializers.IntegerField(source='get_total_score', read_only=True)
    
    class Meta:
        model = Answer
        fields = ['id', 'question', 'question_text', 'choice', 'choice_text', 
                  'choices', 'choices_display', 'notes', 'answered_at', 'total_score', 'documents']


class AnswerCreateSerializer(serializers.ModelSerializer):
    choices_ids = serializers.ListField(
        child=serializers.IntegerField(), 
        write_only=True, 
        required=False
    )
    
    class Meta:
        model = Answer
        fields = ['question', 'choice', 'choices_ids', 'notes']
    
    def create(self, validated_data):
        choices_ids = validated_data.pop('choices_ids', [])
        answer = Answer.objects.create(**validated_data)
        
        if choices_ids:
            answer.choices.set(Choice.objects.filter(id__in=choices_ids))
        
        return answer


class QuestionnaireAttemptSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    survey_name = serializers.CharField(source='survey.name', read_only=True)
    session_name = serializers.CharField(source='session.name', read_only=True)
    recommendations = serializers.SerializerMethodField()
    
    class Meta:
        model = QuestionnaireAttempt
        fields = ['id', 'user', 'user_name', 'survey', 'survey_name', 
                  'session', 'session_name', 'started_at', 'completed_at', 
                  'is_completed', 'total_score', 'environmental_score', 
                  'social_score', 'governance_score', 'overall_grade', 
                  'answers', 'recommendations']
    
    def get_recommendations(self, obj):
        if obj.is_completed:
            return obj.get_recommendations()
        return []


class QuestionnaireAttemptCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionnaireAttempt
        fields = ['survey', 'session']
