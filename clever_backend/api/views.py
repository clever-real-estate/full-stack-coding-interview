from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Photo, Favorite
from .serializer import PhotoSerializer, FavoriteSerializer

@api_view(['GET', 'POST'])
def photos_list_create(request):
    if request.method == 'GET':
        user_id = request.query_params.get('user_id')
        photos = Photo.objects.all()
        serializer = PhotoSerializer(photos, many=True, context={'user_id': user_id})
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data.copy()
        data.pop('is_favorite', None)
        serializer = PhotoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'DELETE'])
def create_delete_favorite(request):
    if request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        photo_id = request.query_params.get('photo_id')
    user_id = request.query_params.get('user_id')
    if not photo_id or not user_id:
        return Response({"error": "photo_id and user_id are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        favorite = Favorite.objects.get(photo_id=photo_id, user_id=user_id)
        favorite.delete()
        return Response({"message": "Favorite deleted"}, status=status.HTTP_204_NO_CONTENT)
    except Favorite.DoesNotExist:
        return Response({"error": "Favorite not found"}, status=status.HTTP_404_NOT_FOUND)