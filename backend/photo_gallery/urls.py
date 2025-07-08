from django.urls import path

from .views import (
    CustomRefreshToken,
    CustomTokenObtainPairView,
    LikedPhotosView,
    PhotoListView,
    UpdateProfileView,
    change_password,
    forgot_password,
    is_authenticated_view,
    logout_view,
    register_user,
    toggle_like_photo,
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
    path("auth/update-profile/", UpdateProfileView.as_view(), name="update-profile"),
    # Photo related URLs
    path("photos/", PhotoListView.as_view(), name="photo-list"),
    path("photos/liked/", LikedPhotosView.as_view(), name="liked-photos"),
    path(
        "photos/<int:photo_id>/like-toggle", toggle_like_photo, name="toggle_like_photo"
    ),
]
