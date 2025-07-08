from django.urls import path

from .views import CustomRefreshToken, CustomTokenObtainPairView, logout_view

urlpatterns = [
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", CustomRefreshToken.as_view(), name="token_refresh"),
    path("auth/logout/", logout_view, name="logout"),
]
