from clever.photos.models import Like, Photo
from django.db.models import Count, Prefetch
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import LikeSerializer, PhotoSerializer


class PhotoListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PhotoSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            likes_prefetch = Prefetch(
                "likes",
                queryset=Like.objects.filter(user=user),
                to_attr="user_likes",
            )
            return Photo.objects.annotate(total_likes=Count("likes")).prefetch_related(
                likes_prefetch
            )
        return None

    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context


class ToggleLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        photo_id = request.data.get("photo")
        user = request.user

        if not photo_id:
            return Response(
                {"message": "Photo ID must be provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        photo = Photo.objects.filter(id=photo_id).first()
        if not photo:
            return Response(
                {"message": "There's no photo with this ID"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        like, created = Like.objects.get_or_create(user=user, photo_id=photo_id)

        if not created:
            like.delete()
            return Response(
                {"message": "Like removed"}, status=status.HTTP_204_NO_CONTENT
            )

        serializer = LikeSerializer(like, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
