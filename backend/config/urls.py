from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('photos/', include('photos.urls')),
    path('users/', include('users.urls')),
]
