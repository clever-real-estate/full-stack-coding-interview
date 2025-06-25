from django.urls import path
from .views import photos_list_create, create_delete_favorite

urlpatterns = [
    path('photos/', photos_list_create, name='photos_list_create'),
    path('favorites/', create_delete_favorite, name='create_favorite'),
]
