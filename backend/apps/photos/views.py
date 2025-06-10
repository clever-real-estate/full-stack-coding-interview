from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from .models import Photo, Like
from .serializers import PhotoSerializer, LikeSerializer


class PhotoListView(generics.ListAPIView):
    """
    API view to retrieve a list of all photos.
    Requires user to be authenticated.
    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]


class PhotoDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve the details of a single photo by primary key.
    (Currently not wired to URLs, but ready for future extension.)
    """
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]


class PhotoLikeView(APIView):
    """
    API view to handle liking and unliking a photo.
    Requires authentication.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        """
        Handles POST request to like a photo.
        Returns 201 if like is created, 400 if already liked.
        """
        photo = get_object_or_404(Photo, pk=pk)
        like, created = Like.objects.get_or_create(user=request.user, photo=photo)
        if not created:
            return Response({"detail": "Already liked."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(LikeSerializer(like).data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        """
        Handles DELETE request to unlike a photo.
        Returns 204 if the like is successfully removed.
        """
        photo = get_object_or_404(Photo, pk=pk)
        like = get_object_or_404(Like, user=request.user, photo=photo)
        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
