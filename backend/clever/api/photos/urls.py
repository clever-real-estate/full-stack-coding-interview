from django.urls import path

from .views import PhotoListView

urlpatterns = [
    path("", PhotoListView.as_view(), name="photo-list"),
]
