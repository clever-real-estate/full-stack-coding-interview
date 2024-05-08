from django.urls import path

from .views import PhotoListView, ToggleLikeView

urlpatterns = [
    path("", PhotoListView.as_view(), name="photo-list"),
    path("like/", ToggleLikeView.as_view(), name="like"),
]
