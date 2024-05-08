from django.urls import path

from .views import TokenObtainView

urlpatterns = [
    path("token/", TokenObtainView.as_view(), name="token_obtain_pair"),
]
