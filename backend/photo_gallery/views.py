import random
import string

from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .email.services import EmailService
from .models import Photo
from .serializers import PhotoSerializer, RegisterSerializer, UserSerializer

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


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def register_user(request):
    """Register a new user."""
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        response_data = {
            "success": True,
            "user": UserSerializer(user).data,
            "message": "User registered successfully.",
        }
        # Send welcome email
        try:
            EmailService.send_welcome_email(user)
        except Exception as e:
            # Log email error but don't fail registration
            # In production, use proper logging
            print(f"Failed to send welcome email: {e}")
        return Response(response_data, status=status.HTTP_201_CREATED)
    return Response(
        {"success": False, "errors": serializer.errors},
        status=status.HTTP_400_BAD_REQUEST,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def forgot_password(request):
    """Handle forgot password requests by generating a new password and sending it via email."""

    email = request.data.get("email")
    if not email:
        return Response({"error": "Email is required."}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        # To avoid revealing if email exists or not, return success anyway
        return Response(
            {
                "message": "If an account with this email exists, a new password has been sent."
            }
        )

    # Generate a random password (e.g., 10 chars)
    new_password = "".join(random.choices(string.ascii_letters + string.digits, k=10))

    # Set the new password
    user.set_password(new_password)
    user.save()

    # Send email with new password
    try:
        EmailService.send_password_reset_email(user, new_password)
    except Exception as e:
        # Log email error but don't fail the password reset
        # In production, use proper logging
        print(f"Failed to send password reset email: {e}")

    return Response(
        {
            "message": "If an account with this email exists, a new password has been sent."
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Allow authenticated users to change their password."""

    # Get the user from the request
    user = request.user
    # Get new and old passwords from the request data
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    if not old_password or not new_password:
        return Response(
            {"error": "Both old_password and new_password are required."}, status=400
        )

    # Check if password are the same
    if old_password == new_password:
        return Response(
            {"error": "New password cannot be the same as the old password."},
            status=400,
        )

    # Check if the old password is correct
    if not user.check_password(old_password):
        return Response({"error": "Old password is incorrect."}, status=400)

    if len(new_password) < 8:
        return Response(
            {"error": "New password must be at least 8 characters long."}, status=400
        )

    user.set_password(new_password)
    user.save()

    return Response({"success": "Password changed successfully."})


class PhotoListView(generics.ListAPIView):
    """
    View to list all photos with optional filtering.

    Filters supported:
      - photographer (by id)
      - width
      - height
      - avg_color
    """

    queryset = Photo.objects.all().select_related("photographer")
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    filterset_fields = ["photographer", "width", "height", "avg_color"]
    ordering_fields = ["id", "width", "height", "created_at"]
    search_fields = ["alt", "photographer__name"]
