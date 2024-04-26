from django.contrib.auth import get_user_model

from rest_framework import serializers, exceptions

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


UserModel = get_user_model()


class CustomTokenObtainSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    default_error_messages = {
        'no_active_account': 'No active account found with the given credentials'
    }

    def validate(self, attrs):
        user = UserModel.objects.get(email=attrs.get('email', ''))
        if not user.is_active:
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )
        
        if not user.check_password(attrs.get('password', '')):
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )

        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer
