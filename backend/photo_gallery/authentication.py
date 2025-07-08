from rest_framework_simplejwt.authentication import JWTAuthentication


class CookiesJWTAuthentication(JWTAuthentication):
    """Custom JWT Authentication class to handle authentication via cookies."""

    def authenticate(self, request):
        # Get the token from cookies
        access_token = request.COOKIES.get("access_token")
        # Return none if no token exists
        if not access_token:
            return None

        validated_token = self.get_validated_token(access_token)

        try:
            user = self.get_user(validated_token)
        except Exception as e:
            # If the user cannot be retrieved, return None
            return None
        # If the user is successfully retrieved, return the user and the validated token
        return (user, validated_token)
