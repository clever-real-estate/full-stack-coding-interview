from rest_framework import serializers
from .models import Photo, Favorite

class PhotoSerializer(serializers.ModelSerializer):
    is_favorite = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = '__all__'

    def get_is_favorite(self, obj):
        user_id = self.context.get('user_id')
        if user_id is None:
            return False
        return Favorite.objects.filter(photo=obj, user_id=user_id).exists()

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = '__all__'