from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.contrib.auth import get_user_model
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    UserRegistrationSerializer,
    PasswordChangeSerializer
)

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom token obtain view that returns user data along with tokens.
    """
    serializer_class = CustomTokenObtainPairSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        user = serializer.validated_data['user']
        token = serializer.validated_data
        
        # Include user data in response
        user_data = UserSerializer(user).data
        
        return Response({
            'access': str(token['access']),
            'refresh': str(token['refresh']),
            'user': user_data
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """
    Logout view that blacklists the refresh token.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            
            return Response({
                'message': 'Successfully logged out'
            }, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({
                'error': 'Invalid token'
            }, status=status.HTTP_400_BAD_REQUEST)


class UserRegistrationView(APIView):
    """
    User registration view.
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            
            # Generate tokens for the new user
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            
            # Return user data with tokens
            user_data = UserSerializer(user).data
            
            return Response({
                'access': str(access),
                'refresh': str(refresh),
                'user': user_data,
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    """
    Get current authenticated user information.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        """Update current user information."""
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    """
    Change user password view.
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = PasswordChangeSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Password changed successfully'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health_check(request):
    """
    Health check endpoint for the authentication service.
    """
    return Response({
        'status': 'healthy',
        'service': 'authentication'
    }, status=status.HTTP_200_OK)