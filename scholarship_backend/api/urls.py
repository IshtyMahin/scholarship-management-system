from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScholarshipViewSet, ApplicationViewSet
from .views_auth import RegisterView, LoginView,RefreshTokenView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'scholarships', ScholarshipViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', RefreshTokenView.as_view(), name='token_refresh'),
]

