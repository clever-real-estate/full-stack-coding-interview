from rest_framework import serializers
from .models import Photo, Like

class PhotoSerializer(serializers.ModelSerializer):
    """
    Serializer for the Photo model.
    Includes a custom field to list usernames of users who liked the photo.
    """
    liked_user = serializers.SerializerMethodField()  # Computed field showing users who liked this photo

    class Meta:
        model = Photo
        fields = (
            "id",
            "photo_id",
            "photographer",
            "alt",
            "avg_color",
            "portfolio",
            "medium_src",
            "liked_user",
        )

    def get_liked_user(self, obj):
        """
        Returns a list of usernames who liked the given photo instance.
        """
        return [like.user.username for like in obj.likes.all()]


class LikeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Like model.
    Returns the ID and timestamp of each 'like' record.
    """
    class Meta:
        model = Like
        fields = ("id", "created_at")
