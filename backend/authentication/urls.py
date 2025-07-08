from django.urls import path

from .views import (
    CustomRefreshToken,
    CustomTokenObtainPairView,
    UpdateProfileView,
    change_password,
    forgot_password,
    is_authenticated_view,
    logout_view,
    register_user,
)

urlpatterns = [
    # Authentication URLs
    path("register/", register_user, name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("refresh/", CustomRefreshToken.as_view(), name="token_refresh"),
    path("logout/", logout_view, name="logout"),
    path("is-authenticated/", is_authenticated_view, name="is_authenticated"),
    path("forgot-password/", forgot_password, name="forgot_password"),
    path("change-password/", change_password, name="change_password"),
    path("update-profile/", UpdateProfileView.as_view(), name="update_profile"),
]
