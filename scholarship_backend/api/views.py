from rest_framework import viewsets, permissions
from .models import Scholarship, Application
from .serializers import ScholarshipSerializer, ApplicationSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db import IntegrityError
from .utils import send_response

class ScholarshipViewSet(viewsets.ModelViewSet):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [permissions.IsAdminUser]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return send_response(True, "Scholarship retrieved successfully!", data=serializer.data)
        except Exception as e:
            return send_response(False, str(e), status_code=404)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            return send_response(True, "Scholarships retrieved successfully!", data=serializer.data)
        except Exception as e:
            return send_response(False, str(e), status_code=400)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return send_response(True, "Scholarship deleted successfully!")
        except Exception as e:
            return send_response(False, str(e), status_code=400)

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

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return send_response(True, "Application retrieved successfully!", data=serializer.data)
        except Exception as e:
            return send_response(False, str(e), status_code=404)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            return send_response(True, "Applications retrieved successfully!", data=serializer.data)
        except Exception as e:
            return send_response(False, str(e), status_code=400)

    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            return send_response(False, "You do not have permission to update the status.", status_code=403)

        status = self.request.data.get('status', None)
        print(status)
        if not status:
            return send_response(False, "Status is required.", status_code=400)

        serializer.instance.status = status
        serializer.save()

        return send_response(True, "Application status updated successfully!", data=serializer.data)


    def perform_create(self, serializer):
        scholarship_id = self.request.data.get("scholarship")
        
        if not scholarship_id:
            return send_response(False,
               "Scholarship ID is required",
                status_code=400,
            )

        try:
            scholarship = Scholarship.objects.get(id=scholarship_id)
        except Scholarship.DoesNotExist:
            return send_response(False,
               "Scholarship not found",
                status_code=404,
            )

        if Application.objects.filter(student=self.request.user, scholarship=scholarship).exists():
            return send_response(False,"You have already applied for this scholarship.",
                status_code=400,
            )

        transcript = self.request.FILES.get("transcript")
        recommendation_letter = self.request.FILES.get("recommendation_letter")
        if not transcript or not recommendation_letter:
            return send_response(False,
              "Both transcript and recommendation letter are required.",
                status_code=400,
            )

        try:
            application = serializer.save(
                student=self.request.user,
                scholarship=scholarship,
                transcript=transcript,
                recommendation_letter=recommendation_letter,
            )
            return send_response(True, "Application submitted successfully!", serializer.data,
            status_code=201,)
        except IntegrityError:
            return send_response(False, "You have already applied for this scholarship.",
                status_code=400,
            )

       

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

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return send_response(True, "Application deleted successfully!")
        except Exception as e:
            return send_response(False, str(e), status_code=400)