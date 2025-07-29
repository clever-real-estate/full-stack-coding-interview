from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Photo, Like
from .serializers import UserSerializer, PhotoSerializer

class UserCreateAPIView(generics.CreateAPIView):
    """
    API view for creating a new user.
    Accessible by any user (authentication not required).
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class PhotoListAPIView(generics.ListAPIView):
    """
    API view to list all photos with pagination.
    Requires authentication.
    """
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Return all Photo objects
        """
        return Photo.objects.select_related('photographer').prefetch_related('likes')

    def get_serializer_context(self):
        """
        Pass the request context to the serializer.
        This is needed for the 'is_liked' field.
        """
        return {'request': self.request}

class LikeToggleAPIView(APIView):
    """
    API view to like or unlike a photo.
    Requires authentication.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, photo_id):
        """
        Handles the POST request to toggle a like on a photo.
        """
        try:
            photo_id = int(photo_id)
        except ValueError:
            return Response({'error': 'Invalid photo ID'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            photo = Photo.objects.get(id=photo_id)
        except Photo.DoesNotExist:
            return Response({'error': 'Photo not found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            like, created = Like.objects.get_or_create(user=request.user, photo=photo)
        except Like.MultipleObjectsReturned:
            Like.objects.filter(user=request.user, photo=photo).delete()
            created = False

        if not created:
            like.delete()
            photo.refresh_from_db()
            return Response({
                'status': 'unliked',
                'likes_count': photo.likes.count(),
                'message': 'Photo unliked successfully'
            }, status=status.HTTP_200_OK)

        photo.refresh_from_db()
        return Response({
            'status': 'liked',
            'likes_count': photo.likes.count(),
            'message': 'Photo liked successfully'
        }, status=status.HTTP_201_CREATED)
