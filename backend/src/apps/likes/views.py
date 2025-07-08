from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from django.shortcuts import get_object_or_404
from .models import Like
from .serializers import LikeSerializer, UserLikeSerializer, LikeStatsSerializer
from apps.photos.models import Photo


class LikeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Like model providing read-only access to likes.
    """
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        """Return likes with related user and photo data."""
        return Like.objects.select_related('user', 'photo').order_by('-created_at')
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def my_likes(self, request):
        """
        Get current user's liked photos.
        """
        user = request.user
        likes = Like.objects.filter(user=user).select_related('photo').order_by('-created_at')
        
        page = self.paginate_queryset(likes)
        if page is not None:
            serializer = UserLikeSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)
        
        serializer = UserLikeSerializer(likes, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def stats(self, request):
        """
        Get like statistics for the current user.
        """
        user = request.user
        
        # Get user's likes
        user_likes = Like.objects.filter(user=user)
        total_likes = user_likes.count()
        
        # Get distinct photos liked
        total_photos_liked = user_likes.values('photo').distinct().count()
        
        # Get most liked photo (that the user has liked)
        most_liked_photo = None
        if total_likes > 0:
            # Find the photo with most likes among photos the user has liked
            liked_photos = Photo.objects.filter(
                id__in=user_likes.values_list('photo_id', flat=True)
            ).annotate(
                like_count=Count('likes')
            ).order_by('-like_count').first()
            
            most_liked_photo = liked_photos
        
        # Get recent likes
        recent_likes = user_likes.select_related('user', 'photo')[:5]
        
        stats_data = {
            'total_likes': total_likes,
            'total_photos_liked': total_photos_liked,
            'most_liked_photo': most_liked_photo,
            'recent_likes': recent_likes
        }
        
        serializer = LikeStatsSerializer(stats_data, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def photo_likes(self, request):
        """
        Get likes for a specific photo.
        """
        photo_id = request.query_params.get('photo_id')
        
        if not photo_id:
            return Response({
                'error': 'photo_id parameter is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        photo = get_object_or_404(Photo, id=photo_id)
        likes = Like.objects.filter(photo=photo).select_related('user').order_by('-created_at')
        
        page = self.paginate_queryset(likes)
        if page is not None:
            serializer = LikeSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)