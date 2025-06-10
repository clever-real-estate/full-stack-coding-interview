from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from django.http import JsonResponse

from .serializers import RegisterSerializer, PasswordResetSerializer


class RegisterView(APIView):
    """
    API view for registering a new user.
    Allows unrestricted access (no authentication required).
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Handle POST request to register a new user.
        Validates input using RegisterSerializer and returns appropriate response.
        """
        serializer = RegisterSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {"detail": "Registration successful."},
                status=status.HTTP_201_CREATED
            )
        except ValidationError:
            # Flatten field-specific error messages into a single string
            errors = []
            for field, msgs in serializer.errors.items():
                for msg in msgs:
                    errors.append(f"{msg}")
            return JsonResponse(
                {"detail": " ".join(errors)},
                status=status.HTTP_400_BAD_REQUEST
            )


class PasswordResetView(APIView):
    """
    API view for resetting a user's password.
    Allows unrestricted access (no authentication required).
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        """
        Handle POST request to reset a user's password.
        Validates input using PasswordResetSerializer and updates the user's password.
        """
        serializer = PasswordResetSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse(
                {"detail": "Password reset successful."},
                status=status.HTTP_200_OK
            )
        except ValidationError:
            # Flatten field-specific error messages into a single string
            errors = []
            for field, msgs in serializer.errors.items():
                for msg in msgs:
                    errors.append(f"{msg}")
            return Response(
                {"detail": " ".join(errors)},
                status=status.HTTP_400_BAD_REQUEST
            )
