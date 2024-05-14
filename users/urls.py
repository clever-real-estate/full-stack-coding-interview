from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views
from .views import UserLogin, UserRegister

router = DefaultRouter()
router.register(r'users', UserLogin, basename='login')
router.register(r'users', UserRegister, basename='register')

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
]
