from django.urls import path

from .views import (
    CustomRefreshToken,
    CustomTokenObtainPairView,
    PhotoListView,
    change_password,
    forgot_password,
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
    path("auth/forgot-password/", forgot_password, name="forgot_password"),
    path("auth/change-password/", change_password, name="change_password"),
    # Photo related URLs
    path("photos/", PhotoListView.as_view(), name="photo-list"),
]
