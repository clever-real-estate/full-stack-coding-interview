from photos.models import Photo
from rest_framework import serializers

class PhotoSerializer(serializers.ModelSerializer):
    user_liked = serializers.SerializerMethodField()
    class Meta:
        model = Photo
        fields = "__all__"

    def get_user_liked(self, obj):
        user = self.context['request'].user
        return obj.likes.filter(user=user).exists()
