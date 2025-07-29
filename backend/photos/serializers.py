from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Photo, Photographer, Like

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model, used for user creation.
    The password is write-only.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class PhotographerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Photographer model.
    """
    class Meta:
        model = Photographer
        fields = ('name', 'url')

class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model.
    """
    class Meta:
        model = Like
        fields = ('id', 'user', 'photo', 'created_at')
        read_only_fields = ('user',)

class PhotoSerializer(serializers.ModelSerializer):
    """
    Serializer for the Photo model.
    Includes calculated fields for the number of likes and whether
    the current user has liked the photo.
    """
    photographer = PhotographerSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ('id', 'image_url', 'color', 'alt_text', 'photographer', 'likes_count', 'is_liked')

    def get_likes_count(self, obj):
        """
        Returns the total number of likes for the photo.
        """
        return obj.likes.count()

    def get_is_liked(self, obj):
        """
        Checks if the current user (from the request context) has liked the photo.
        Returns False for anonymous users.
        """
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False
