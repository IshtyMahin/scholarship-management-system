from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .utils import send_response  
from rest_framework_simplejwt.tokens import RefreshToken

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
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        print(username,email,password)
        try:
            validate_email(email)  
        except DjangoValidationError:
            return send_response(
                False,
                "Invalid email format.",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():

            return send_response(
                False,
                "Username already exists. Please choose a different username.",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return send_response(
                False,
                "Email already exists. Please use a different email.",
                status_code=status.HTTP_400_BAD_REQUEST
            )

        serializer = UserSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            try:
                user = serializer.save() 
                print(user.id,user.username,user.is_staff)
                tokens = get_tokens_for_user(user) 
                print(tokens)
                return send_response(
                    True,
                    "User registered successfully.",
                    data={
                        'user': {
                            'id': user.id,
                            'username': user.username,
                            'email': user.email,
                            'is_admin': user.is_staff
                        },
                        'tokens': tokens
                    },
                    status_code=status.HTTP_201_CREATED
                )
            
            except IntegrityError:
              
                return send_response(
                    False,
                    "Registration failed due to a database error.",
                    status_code=status.HTTP_400_BAD_REQUEST
                )
        
        return send_response(
            False,
            "Registration failed.",
            data=serializer.errors
        )
class LoginView(APIView):
    authentication_classes = []  
    permission_classes = []  
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        # print(username,password)
        try:
            user = User.objects.get(username=username) 
        except User.DoesNotExist:
            return send_response(
                False,
                "User not found. Please check your username.",
                status_code=status.HTTP_404_NOT_FOUND
            )

        if not user.check_password(password):
            return send_response(
                False,
                "Incorrect password. Please try again.",
                status_code=status.HTTP_401_UNAUTHORIZED
            )

        tokens = get_tokens_for_user(user)
        # print(tokens)
        print(user.id)
        data = {
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_admin': user.is_staff
                },
                'tokens': tokens
            }
        print(data)
        return send_response(
            True,
            "Login successful.",
            data,
            status_code=status.HTTP_200_OK
        )

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


