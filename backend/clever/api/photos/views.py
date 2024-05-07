from clever.photos.models import Photo
from rest_framework.generics import ListAPIView

from .serializers import PhotoSerializer


class PhotoListView(ListAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
