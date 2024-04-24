from photos.models import LikePhoto, Photo
from photos.serializers import PhotoSerializer
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response


class PhotoViewset(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated,]

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        photo = self.get_object()
        user = request.user

        if LikePhoto.objects.filter(user=user, photo=photo).exists():
            LikePhoto.objects.filter(user=user, photo=photo).delete()
            return Response({'liked': False}, status=status.HTTP_200_OK)
        else:
            LikePhoto.objects.create(user=user, photo=photo)
            return Response({'liked': True}, status=status.HTTP_200_OK)