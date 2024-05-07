from clever.photos.models import Photo
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import PhotoSerializer


class PhotoListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
