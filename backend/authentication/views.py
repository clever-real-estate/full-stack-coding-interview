import random
import string

from django.conf import settings
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .email.services import EmailService
from .serializers import RegisterSerializer, UserSerializer

access_token_lifetime = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]
refresh_token_lifetime = settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"]

# Create your views here.


class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom view to handle token obtain pair requests.

    This view overrides the post method to set the access and refresh tokens
    as HTTP-only cookies in the response.

    This enhances security by preventing
    client-side scripts from accessing the tokens, thus mitigating the risk of
    cross-site scripting (XSS) attacks.
    """

    @method_decorator(ratelimit(key="ip", rate="20/m", block=True))
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            # Extract access and refresh tokens from the response data
            if "access" not in tokens or "refresh" not in tokens:
                return Response(
                    {"success": False, "error": {"message": "Tokens not found"}},
                    status=400,
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
                max_age=int(access_token_lifetime.total_seconds()),
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path="/",
                max_age=int(refresh_token_lifetime.total_seconds()),
            )
            return res
        except Exception as e:
            print(e)
            # If an error occurs, return a response indicating failure
            if hasattr(e, "detail"):
                return Response({"success": False, "error": e.detail}, status=400)
            return Response({"success": False})


class CustomRefreshToken(TokenRefreshView):
    """Custom view to handle token refresh requests."""

    @method_decorator(ratelimit(key="ip", rate="20/m", block=True))
    def post(self, request, *args, **kwargs):
        try:
            # Extract the refresh token from the request cookies
            if "refresh_token" not in request.COOKIES:
                return Response(
                    {
                        "refreshed": False,
                        "error": {"message": "Refresh token not found"},
                    },
                    status=400,
                )
            refresh_token = request.COOKIES.get("refresh_token")

            request.data["refresh"] = refresh_token

            response = super().post(request, *args, **kwargs)
            # Extract the new access token from the response data
            if "access" not in response.data:
                return Response(
                    {
                        "refreshed": False,
                        "error": {"message": "Access token not found"},
                    },
                    status=400,
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
                max_age=int(access_token_lifetime.total_seconds()),
            )
            return res
        except Exception as e:
            if hasattr(e, "detail"):
                return Response({"refreshed": False, "error": e.detail}, status=400)
            return Response({"refreshed": False})


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
@ratelimit(key="ip", rate="5/m", block=True)
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
            {"error": {"message": "Both old_password and new_password are required."}},
            status=400,
        )

    # Check if password are the same
    if old_password == new_password:
        return Response(
            {
                "error": {
                    "message": "New password cannot be the same as the old password."
                }
            },
            status=400,
        )

    # Check if the old password is correct
    if not user.check_password(old_password):
        return Response(
            {"error": {"message": "Old password is incorrect."}}, status=400
        )

    if len(new_password) < 8:
        return Response(
            {"error": {"message": "New password must be at least 8 characters long."}},
            status=400,
        )

    user.set_password(new_password)
    user.save()

    return Response({"success": "Password changed successfully."})


class UpdateProfileView(APIView):
    """View to update the authenticated user's profile information."""

    permission_classes = [IsAuthenticated]

    def patch(self, request):
        """Update the user's first and last name."""

        # Get the user from the request
        user = request.user

        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")

        # Simple validation for first and last names
        # Ensure values are provided and min length is 2 & max length is 50

        if first_name is not None and 2 <= len(first_name) <= 50:
            user.first_name = first_name
        else:
            return Response(
                {
                    "error": {
                        "message": "First name must be between 2 and 50 characters."
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if last_name is not None and 2 <= len(last_name) <= 50:
            user.last_name = last_name
        else:
            return Response(
                {
                    "error": {
                        "message": "Last name must be between 2 and 50 characters."
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Save the user instance
        user.save()
        return Response(
            {
                "success": True,
                "message": "Profile updated successfully",
                "user": {
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
            },
            status=status.HTTP_200_OK,
        )
