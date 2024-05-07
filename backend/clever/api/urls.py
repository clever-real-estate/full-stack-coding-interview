from django.urls import include, path

urlpatterns = [
    path("photos/", include("clever.api.photos.urls"), name="photos"),
]
