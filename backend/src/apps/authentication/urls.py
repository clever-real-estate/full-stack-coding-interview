from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    LogoutView,
    UserRegistrationView,
    CurrentUserView,
    ChangePasswordView,
    health_check
)

urlpatterns = [
    # Authentication endpoints
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    # User management endpoints
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('user/', CurrentUserView.as_view(), name='current_user'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    
    # Health check
    path('health/', health_check, name='auth_health'),
]