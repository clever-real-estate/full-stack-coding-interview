from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Photo, Like
from .serializers import PhotoSerializer, UserSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return Response({
                    'message': 'Login successful',
                    'user': UserSerializer(user).data
                })
            else:
                return Response({
                    'error': 'Invalid credentials'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'error': 'Username and password are required'
            }, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})


class UserView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response(UserSerializer(request.user).data)
        return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


class PhotoListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        photos = Photo.objects.all()[:10]  # Only show 10 photos as per requirements
        serializer = PhotoSerializer(photos, many=True, context={'request': request})
        return Response(serializer.data)


@method_decorator(csrf_exempt, name='dispatch')
class LikeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, photo_id):
        try:
            photo = Photo.objects.get(id=photo_id)
            like, created = Like.objects.get_or_create(user=request.user, photo=photo)
            if created:
                return Response({'message': 'Photo liked'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'Photo already liked'}, status=status.HTTP_200_OK)
        except Photo.DoesNotExist:
            return Response({'error': 'Photo not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, photo_id):
        try:
            photo = Photo.objects.get(id=photo_id)
            like = Like.objects.filter(user=request.user, photo=photo)
            if like.exists():
                like.delete()
                return Response({'message': 'Like removed'})
            else:
                return Response({'error': 'Photo not liked'}, status=status.HTTP_404_NOT_FOUND)
        except Photo.DoesNotExist:
            return Response({'error': 'Photo not found'}, status=status.HTTP_404_NOT_FOUND)
