from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Scholarship, Application
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  
        extra_kwargs = {
            'password': {'write_only': True} 
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super().create(validated_data)
        
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