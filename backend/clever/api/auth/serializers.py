from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenObtainSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        return {"access": data["access"]}
