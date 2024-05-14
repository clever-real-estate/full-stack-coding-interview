from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status

from photos.models import Photo, UserPhoto
from photos.serializers import PhotoSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter photos to only those owned by the current user
        user = self.request.user
        return Photo.objects.filter(owner=user)

    def perform_create(self, serializer):
        # Associate the owner to the current user
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        user_photo, created = UserPhoto.objects.get_or_create(user=self.request.user, photo_id=pk)
        user_photo.liked = not user_photo.liked
        user_photo.save()
        return Response({'status': f'liked: {user_photo.liked}'}, status=status.HTTP_200_OK)
