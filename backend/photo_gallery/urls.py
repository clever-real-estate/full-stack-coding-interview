from django.urls import path

from .views import (
    CustomRefreshToken,
    CustomTokenObtainPairView,
    is_authenticated_view,
    logout_view,
    register_user,
)

urlpatterns = [
    # Authentication URLs
    path("auth/register/", register_user, name="register"),
    path("auth/login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("auth/refresh/", CustomRefreshToken.as_view(), name="token_refresh"),
    path("auth/logout/", logout_view, name="logout"),
    path("auth/is-authenticated/", is_authenticated_view, name="is_authenticated"),
]
