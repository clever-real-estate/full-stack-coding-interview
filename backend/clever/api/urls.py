from django.urls import include, path

urlpatterns = [
    path("photos/", include("clever.api.photos.urls"), name="photos"),
    path("auth/", include("clever.api.auth.urls"), name="auth"),
]
