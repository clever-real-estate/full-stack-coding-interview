from django.urls import path

from .views import CustomRefreshToken, CustomTokenObtainPairView

urlpatterns = [
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", CustomRefreshToken.as_view(), name="token_refresh"),
]
