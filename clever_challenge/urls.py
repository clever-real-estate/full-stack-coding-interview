from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls, name='admin'),
    path('', include('photos.urls'), name='photos'),
    path('', include('users.urls')),
]
