from rest_framework import serializers
from photos.models import Photo, Photographer, UserPhoto


class PhotographerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photographer
        fields = ['id', 'name', 'portfolio', 'photographer_id']


class PhotoSerializer(serializers.ModelSerializer):
    photographer = PhotographerSerializer(read_only=True)
    liked_by_user = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        # fields = '__all__'
        fields = ['id', 'owner', 'photographer', 'photo_id', 'liked_by_user', 'width', 'height', 'url', 'avg_color',
                  'original_url', 'large2x_url', 'large_url', 'medium_url', 'small_url', 'portrait_url',
                  'landscape_url', 'tiny_url', 'description']
        extra_kwargs = {
            'owner': {'read_only': True}
        }

    def get_liked_by_user(self, obj):
        # Retrieve the request user from the serializer context
        user = self.context['request'].user
        if user.is_authenticated:
            user_photo = UserPhoto.objects.filter(user=user, photo=obj).first()
            return user_photo.liked if user_photo else False
        return False
