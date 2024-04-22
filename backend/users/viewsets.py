from django.contrib.auth.models import User
from users.serializers import UserSerializer
from rest_framework import viewsets


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
