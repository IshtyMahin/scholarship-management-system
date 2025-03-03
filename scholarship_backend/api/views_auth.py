from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import UserSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    authentication_classes = []  
    permission_classes = []  

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)  

            return Response({
                'success': "User registered successfully.", 
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_admin': user.is_staff
                },
                'tokens': tokens  
            }, status=201)
        
        return Response({
            'error': "Registration failed.",  
            'details': serializer.errors  
        }, status=400)


class LoginView(APIView):
    authentication_classes = []  
    permission_classes = []  

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            tokens = get_tokens_for_user(user)
            return Response({
                'success': "Login successful.",  
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_admin': user.is_staff
                },
                'tokens': tokens 
            }, status=200)

        return Response({
            'error': "Invalid credentials." 
        }, status=401)

class RefreshTokenView(APIView):
    authentication_classes = [] 
    permission_classes = []  

    def post(self, request):
        refresh_token = request.data.get("refresh")
        
        if not refresh_token:
            return Response({
                'error': "Refresh token required." 
            }, status=400)

        try:
            refresh = RefreshToken(refresh_token) 
            access_token = str(refresh.access_token) 
            return Response({
                'success': "Access token refreshed successfully.", 
                'access': access_token
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': "Invalid refresh token." 
            }, status=401)
