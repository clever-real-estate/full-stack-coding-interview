from clever.photos.models import Photo
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
            "photographer",
            "photographer_url",
            "description",
            "image_url",
            "image",
            "liked",
            "likes",
        ]
