from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import RegisterView, PasswordResetView

# URL configuration for the accounts app.
# Includes endpoints for user registration, login (JWT token), and password reset.

urlpatterns = [
    # Endpoint for user registration
    path("register/", RegisterView.as_view(), name="auth_register"),

    # Endpoint for JWT authentication token retrieval (login)
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),

    # Endpoint for resetting user password
    path('passwordreset/', PasswordResetView.as_view(), name='password_reset'),
]
