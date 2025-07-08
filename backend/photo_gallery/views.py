from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import UserSerializer

# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom view to handle token obtain pair requests.

    This view overrides the post method to set the access and refresh tokens
    as HTTP-only cookies in the response.

    This enhances security by preventing
    client-side scripts from accessing the tokens, thus mitigating the risk of
    cross-site scripting (XSS) attacks.
    """

    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            # Extract access and refresh tokens from the response data
            if "access" not in tokens or "refresh" not in tokens:
                return Response(
                    {"success": False, "error": "Tokens not found"}, status=400
                )
            access_token = tokens["access"]
            refresh_token = tokens["refresh"]
            # Create a new response object to set cookies
            res = Response()

            res.data = {"success": True}
            # Set the access and refresh tokens as HTTP-only cookies
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            return res
        except Exception as e:
            print(e)
            # If an error occurs, return a response indicating failure
            if hasattr(e, "detail"):
                return Response({"success": False, "error": str(e.detail)}, status=400)
            return Response({"success": False})


class CustomRefreshToken(TokenRefreshView):
    """Custom view to handle token refresh requests."""

    def post(self, request, *args, **kwargs):
        try:
            # Extract the refresh token from the request cookies
            if "refresh_token" not in request.COOKIES:
                return Response(
                    {"refreshed": False, "error": "Refresh token not found"}, status=400
                )
            refresh_token = request.COOKIES.get("refresh_token")
            # Add the refresh token to the request data
            if "refresh" not in request.data:
                return Response(
                    {"refreshed": False, "error": "Refresh token not provided"},
                    status=400,
                )
            request.data["refresh"] = refresh_token

            response = super().post(request, *args, **kwargs)
            # Extract the new access token from the response data
            if "access" not in response.data:
                return Response(
                    {"refreshed": False, "error": "Access token not found"}, status=400
                )
            tokens = response.data
            access_token = tokens["access"]

            res = Response()

            res.data = {"refreshed": True}

            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
            )
            return res
        except Exception as e:
            if hasattr(e, "detail"):
                return Response(
                    {"refreshed": False, "error": str(e.detail)}, status=400
                )
            return Response({"refreshed": False})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Logs out the user by clearing JWT tokens from cookies."""
    response = Response({"message": "Successfully logged out."}, status=200)

    # Delete the cookies by setting empty values and expired max_age
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")

    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def is_authenticated_view(request):
    """Check if the user is authenticated and return user data."""
    user = request.user
    serialized_user = UserSerializer(user)
    return Response({"authenticated": True, "user": serialized_user.data})
