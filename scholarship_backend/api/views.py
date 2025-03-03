from rest_framework import viewsets, permissions
from .models import Scholarship, Application
from .serializers import ScholarshipSerializer, ApplicationSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError


class ScholarshipViewSet(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]


class ApplicationViewSet(viewsets.ModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        status_filter = self.request.query_params.get('status', None)
        scholarship_filter = self.request.query_params.get('scholarship', None)

        queryset = Application.objects.all() if user.is_staff else Application.objects.filter(student=user)

        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        if scholarship_filter:
            queryset = queryset.filter(scholarship_id=scholarship_filter)

        return queryset

    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            raise permissions.PermissionDenied("You do not have permission to update the status.")

        status = self.request.data.get('status', None)
        print(status)
        if not status:
            raise ValidationError("Status is required.")

        serializer.instance.status = status
        print(serializer)
        serializer.save()

        return Response({
            'message': 'Application status updated successfully!',
            'data': serializer.data
        }, status=200)

    def perform_create(self, serializer):
    

        scholarship_id = self.request.data.get("scholarship")

        if not scholarship_id:
            raise ValidationError("Scholarship ID is required")

        try:
            scholarship = Scholarship.objects.get(id=scholarship_id)
        except Scholarship.DoesNotExist:
            raise ValidationError("Scholarship not found")

        serializer.save(
            student=self.request.user,
            scholarship=scholarship,
            transcript=self.request.FILES.get("transcript"),
            recommendation_letter=self.request.FILES.get("recommendation_letter")
        )

        # self.send_application_email(serializer.instance)

        return Response({
            'message': 'Application submitted successfully!',
            'data': serializer.data
        }, status=200)

  
    def send_application_email(self, application):
        subject = f"Application Submitted for {application.scholarship.title}"
        message = (
            f"Dear {application.student.username},\n\n"
            f"Your application for the scholarship '{application.scholarship.title}' has been submitted successfully.\n"
            f"Status: {application.status}\n\n"
            f"Thank you!"
        )
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [application.student.email],
            fail_silently=False,
        )
