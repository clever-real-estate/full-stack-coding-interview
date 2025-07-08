from rest_framework import serializers
from django.db.models import Count, Exists, OuterRef
from .models import Photo
from apps.likes.models import Like


class PhotoSerializer(serializers.ModelSerializer):
    """
    Serializer for Photo model with like information.
    """
    like_count = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    aspect_ratio = serializers.ReadOnlyField()
    
    class Meta:
        model = Photo
        fields = [
            'id', 'pexels_id', 'width', 'height', 'url', 'photographer',
            'photographer_url', 'photographer_id', 'avg_color', 'src_original',
            'src_large', 'src_medium', 'src_small', 'alt_text', 'like_count',
            'user_liked', 'aspect_ratio', 'created_at', 'updated_at'
        ]
        read_only_fields = [
            'id', 'created_at', 'updated_at', 'like_count', 'user_liked', 'aspect_ratio'
        ]
    
    def get_like_count(self, obj):
        """Return the number of likes for this photo."""
        # Try to get from annotation first (for optimized queries)
        if hasattr(obj, 'like_count_annotated'):
            return obj.like_count_annotated
        return obj.get_like_count()
    
    def get_user_liked(self, obj):
        """Return whether the current user has liked this photo."""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False
        
        # Try to get from annotation first (for optimized queries)
        if hasattr(obj, 'user_liked_annotated'):
            return obj.user_liked_annotated
        
        return obj.is_liked_by_user(request.user)


class PhotoDetailSerializer(PhotoSerializer):
    """
    Detailed serializer for Photo model with additional photographer info.
    """
    photographer_info = serializers.SerializerMethodField()
    
    class Meta(PhotoSerializer.Meta):
        fields = PhotoSerializer.Meta.fields + ['photographer_info']
    
    def get_photographer_info(self, obj):
        """Return detailed photographer information."""
        return {
            'name': obj.photographer,
            'url': obj.photographer_url,
            'pexels_id': obj.photographer_id
        }


class PhotoCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating new photos (admin use).
    """
    class Meta:
        model = Photo
        exclude = ['id', 'created_at', 'updated_at']
    
    def validate_pexels_id(self, value):
        """Ensure pexels_id is unique."""
        if Photo.objects.filter(pexels_id=value).exists():
            raise serializers.ValidationError("A photo with this Pexels ID already exists.")
        return value
    
    def validate(self, attrs):
        """Validate photo data."""
        # Ensure dimensions are positive
        if attrs.get('width', 0) <= 0:
            raise serializers.ValidationError({"width": "Width must be positive."})
        
        if attrs.get('height', 0) <= 0:
            raise serializers.ValidationError({"height": "Height must be positive."})
        
        # Validate URLs
        required_urls = ['url', 'src_original']
        for url_field in required_urls:
            if not attrs.get(url_field):
                raise serializers.ValidationError({url_field: "This field is required."})
        
        return attrs