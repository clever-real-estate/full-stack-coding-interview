from django.urls import path
from .views import UserCreateAPIView, PhotoListAPIView, LikeToggleAPIView

urlpatterns = [
    path('users/signup/', UserCreateAPIView.as_view(), name='user-signup'),
    path('photos/', PhotoListAPIView.as_view(), name='photo-list'),
    path('photos/<int:photo_id>/like/', LikeToggleAPIView.as_view(), name='photo-like'),
]
