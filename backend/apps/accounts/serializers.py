from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for registering a new user.
    Ensures the username is unique and enforces a minimum password length.
    """

    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Username already taken."  # Custom error message for duplicate username
            )
        ]
    )
    password = serializers.CharField(write_only=True, min_length=8)  # Password must be at least 8 characters

    class Meta:
        model = User
        fields = ("username", "password")  # Fields to be serialized/deserialized

    def create(self, validated_data):
        """
        Creates a new user instance using Django's built-in create_user method,
        which automatically hashes the password.
        """
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )

class PasswordResetSerializer(serializers.Serializer):
    """
    Serializer for resetting a user's password.
    Requires a valid username and a new password.
    """

    username = serializers.CharField()  # Username of the user requesting the reset
    new_password = serializers.CharField(write_only=True, min_length=8)  # New password with min length constraint

    def validate_username(self, value):
        """
        Validates that the provided username exists in the database.
        """
        try:
            User.objects.get(username=value)
        except User.DoesNotExist:
            raise serializers.ValidationError('User not found.')
        return value

    def save(self):
        """
        Updates the user's password with the provided new password.
        Uses set_password to ensure the password is properly hashed.
        """
        user = User.objects.get(username=self.validated_data["username"])
        user.set_password(self.validated_data["new_password"])
        user.save()
        return user
