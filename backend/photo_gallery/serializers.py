from rest_framework import serializers

from .models import Like, Photo, Photographer


class PhotographerSerializer(serializers.ModelSerializer):
    """Serializer for the Photographer model."""

    photo_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Photographer
        fields = [
            "id",
            "name",
            "url",
            "pexels_id",
            "photo_count",
            "created_at",
            "updated_at",
        ]


class PhotoSerializer(serializers.ModelSerializer):
    """Serializer for the Photo model."""

    photographer = PhotographerSerializer(read_only=True)

    class Meta:
        model = Photo
        fields = [
            "id",
            "photographer",
            "width",
            "height",
            "url",
            "alt",
            "avg_color",
            "src_original",
            "src_large2x",
            "src_large",
            "src_medium",
            "src_small",
            "src_portrait",
            "src_landscape",
            "src_tiny",
        ]


class LikeSerializer(serializers.ModelSerializer):
    """Serializer for the Like model."""

    user = serializers.StringRelatedField(read_only=True)
    photo = PhotoSerializer(read_only=True)
    photo_id = serializers.PrimaryKeyRelatedField(
        queryset=Photo.objects.all(), write_only=True, source="photo"
    )

    class Meta:
        model = Like
        fields = ["id", "user", "photo", "photo_id", "created_at"]
