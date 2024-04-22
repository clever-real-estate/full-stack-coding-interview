from django.contrib import admin
from django.urls import path, include

from config.token import CustomTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenObtainPairView.as_view(), name='token_refresh'),
    path('photos/', include('photos.urls')),
    path('users/', include('users.urls')),
]
