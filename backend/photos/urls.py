from django.urls import path
from .views import LoginView, LogoutView, UserView, PhotoListView, LikeView

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    path('auth/user/', UserView.as_view(), name='user'),
    path('photos/', PhotoListView.as_view(), name='photos'),
    path('photos/<int:photo_id>/like/', LikeView.as_view(), name='like'),
] 