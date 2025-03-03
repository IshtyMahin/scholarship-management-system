from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Scholarship, Application


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  
        
class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = ['id', 'title', 'description', 'eligibility', 'deadline', 'funding_amount']  

class ApplicationSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)  
    scholarship = ScholarshipSerializer(read_only=True)  

    class Meta:
        model = Application
        fields = ['id', 'student', 'scholarship', 'status', 'transcript', 'recommendation_letter', 'submitted_at']