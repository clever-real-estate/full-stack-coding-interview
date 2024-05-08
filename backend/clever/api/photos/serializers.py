from datetime import timezone

from clever.photos.models import Like, Photo
from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer


class PhotoSerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(
        sizes=[
            ("default", "url"),
            ("landscape", "thumbnail__627x1200"),
            ("portrait", "thumbnail__1280x800"),
            ("large", "crop__940x650"),
            ("medium", "thumbnail__500x350"),
            ("small", "thumbnail__300x120"),
            ("thumb", "crop__120x120"),
        ]
    )
    liked = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = [
            "id",
            "photographer",
            "photographer_url",
            "description",
            "image_url",
            "image",
            "liked",
            "likes",
            "color",
        ]

    def get_liked(self, obj):
        if hasattr(obj, "user_likes"):
            return any(like.photo_id == obj.id for like in obj.user_likes)
        return False

    def get_likes(self, obj):
        return obj.total_likes


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "photo", "date"]
        read_only_fields = ["user", "date"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        validated_data["date"] = timezone.now()
        return super().create(validated_data)
