from rest_framework import serializers
from .models import Like
from apps.authentication.serializers import UserSerializer
from apps.photos.serializers import PhotoSerializer


class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for Like model with user information.
    """
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = ['id', 'user', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class UserLikeSerializer(serializers.ModelSerializer):
    """
    Serializer for Like model with photo information (for user's liked photos).
    """
    photo = PhotoSerializer(read_only=True)
    
    class Meta:
        model = Like
        fields = ['id', 'photo', 'created_at']
        read_only_fields = ['id', 'photo', 'created_at']


class LikeCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating likes.
    """
    class Meta:
        model = Like
        fields = ['photo']
    
    def create(self, validated_data):
        """Create a like with the current user."""
        user = self.context['request'].user
        photo = validated_data['photo']
        
        # Use the toggle_like method to handle creation/deletion
        like, created = Like.toggle_like(user, photo)
        
        if not created and like is None:
            # Like was removed
            raise serializers.ValidationError("Like was removed")
        
        return like


class LikeStatsSerializer(serializers.Serializer):
    """
    Serializer for like statistics.
    """
    total_likes = serializers.IntegerField()
    total_photos_liked = serializers.IntegerField()
    most_liked_photo = PhotoSerializer(read_only=True)
    recent_likes = LikeSerializer(many=True, read_only=True)