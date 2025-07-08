from django_filters.rest_framework import DjangoFilterBackend
from django_ratelimit.decorators import ratelimit
from rest_framework import filters, generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Like, Photo
from .serializers import PhotoSerializer

# Create your views here.


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


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@ratelimit(key="ip", rate="20/m", block=True)
def toggle_like_photo(request, photo_id):
    """
    Toggle like/unlike on a photo for the logged-in user.

    - If the photo is already liked by the user, it will be unliked.
    - If the photo is not yet liked, it will be liked.
    """

    # Get the current user from the request
    user = request.user

    try:
        photo = Photo.objects.get(id=photo_id)
    except Photo.DoesNotExist:
        return Response({"error": "Photo not found."}, status=status.HTTP_404_NOT_FOUND)

    existing_like = Like.objects.filter(user=user, photo=photo).first()

    if existing_like:
        existing_like.delete()
        return Response({"liked": False}, status=status.HTTP_200_OK)
    else:
        Like.objects.create(user=user, photo=photo)
        return Response({"liked": True}, status=status.HTTP_201_CREATED)


class LikedPhotosView(APIView):
    """View to list all photos liked by the authenticated user."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        liked_photos = Photo.objects.filter(likes__user=request.user).distinct()
        serializer = PhotoSerializer(liked_photos, many=True)
        return Response(serializer.data)
