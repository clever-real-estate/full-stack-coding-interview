from django.urls import path

from .views import LikedPhotosView, PhotoDetailView, PhotoListView, toggle_like_photo

urlpatterns = [
    # Photo related URLs
    path("photos/", PhotoListView.as_view(), name="photo-list"),
    path("photos/liked/", LikedPhotosView.as_view(), name="liked-photos"),
    path("photos/<int:pk>/", PhotoDetailView.as_view(), name="photo-detail"),
    path(
        "photos/<int:photo_id>/like-toggle/",
        toggle_like_photo,
        name="toggle_like_photo",
    ),
]
