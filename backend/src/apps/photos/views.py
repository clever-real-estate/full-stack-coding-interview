from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, Exists, OuterRef, Q
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .models import Photo
from .serializers import PhotoSerializer, PhotoDetailSerializer, PhotoCreateSerializer
from apps.likes.models import Like


class StandardResultsSetPagination(PageNumberPagination):
    """
    Custom pagination class for photos.
    """
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50
    
    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'page_size': self.page_size,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data
        })


class PhotoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Photo model providing list and detail views.
    """
    serializer_class = PhotoSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['photographer', 'photographer_id']
    search_fields = ['photographer', 'alt_text']
    ordering_fields = ['created_at', 'photographer', 'like_count']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """
        Optimized queryset with like count and user like status annotations.
        """
        user = self.request.user
        
        queryset = Photo.objects.select_related().prefetch_related('likes').annotate(
            like_count_annotated=Count('likes', distinct=True)
        )
        
        if user.is_authenticated:
            queryset = queryset.annotate(
                user_liked_annotated=Exists(
                    Like.objects.filter(
                        user=user,
                        photo=OuterRef('pk')
                    )
                )
            )
        
        return queryset
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'retrieve':
            return PhotoDetailSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return PhotoCreateSerializer
        return PhotoSerializer
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def like(self, request, pk=None):
        """
        Toggle like status for a photo.
        """
        photo = self.get_object()
        user = request.user
        
        like, created = Like.toggle_like(user, photo)
        
        # Get updated like count
        like_count = photo.get_like_count()
        
        if created and like:
            # Photo was liked
            return Response({
                'message': 'Photo liked successfully',
                'liked': True,
                'like_count': like_count
            }, status=status.HTTP_200_OK)
        else:
            # Photo was unliked
            return Response({
                'message': 'Photo unliked successfully',
                'liked': False,
                'like_count': like_count
            }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def likes(self, request, pk=None):
        """
        Get list of users who liked this photo.
        """
        photo = self.get_object()
        likes = Like.objects.filter(photo=photo).select_related('user').order_by('-created_at')
        
        # Paginate likes
        page = self.paginate_queryset(likes)
        if page is not None:
            like_data = []
            for like in page:
                like_data.append({
                    'id': like.id,
                    'user': {
                        'id': like.user.id,
                        'email': like.user.email,
                        'first_name': like.user.first_name,
                        'last_name': like.user.last_name
                    },
                    'created_at': like.created_at
                })
            return self.get_paginated_response(like_data)
        
        like_data = []
        for like in likes:
            like_data.append({
                'id': like.id,
                'user': {
                    'id': like.user.id,
                    'email': like.user.email,
                    'first_name': like.user.first_name,
                    'last_name': like.user.last_name
                },
                'created_at': like.created_at
            })
        
        return Response(like_data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def popular(self, request):
        """
        Get photos ordered by like count (most popular first).
        """
        queryset = self.get_queryset().annotate(
            like_count_for_ordering=Count('likes')
        ).order_by('-like_count_for_ordering', '-created_at')
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def search(self, request):
        """
        Enhanced search across photos.
        """
        query = request.query_params.get('q', '')
        
        if not query:
            return Response({
                'error': 'Search query parameter "q" is required.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        queryset = self.get_queryset().filter(
            Q(photographer__icontains=query) |
            Q(alt_text__icontains=query) |
            Q(pexels_id__icontains=query)
        ).distinct()
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)