from django.urls import path
from .views import PhotoListView, PhotoDetailView, PhotoLikeView

# URL configuration for the photos app.
# Includes endpoints for listing photos and liking/unliking photos.

urlpatterns = [
    # GET: List all photos (requires authentication)
    path("", PhotoListView.as_view(), name="photo_list"),

    # POST: Like a photo
    # DELETE: Unlike a photo
    path("<int:pk>/like/", PhotoLikeView.as_view(), name="photo_like"),
]
