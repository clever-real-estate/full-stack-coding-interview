from photos.models import Photo
from photos.serializers import PhotoSerializer
from rest_framework import viewsets


class PhotoViewset(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
