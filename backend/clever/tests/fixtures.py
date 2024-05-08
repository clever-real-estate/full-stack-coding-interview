import pytest
from clever.photos.models import Like, Photo
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user():
    return User.objects.create(username="clever", password="temp123")


@pytest.fixture
def second_user():
    return User.objects.create(username="felipe", password="temp123")


@pytest.fixture
def photo():
    return Photo.objects.create(
        description="A lion in the nature", photographer="Felipe Faria"
    )


@pytest.fixture
def second_photo():
    return Photo.objects.create(
        description="A tiger in the nature", photographer="Felipe Faria"
    )


@pytest.fixture
def like(user, photo):
    return Like.objects.create(photo=photo, user=user)


@pytest.fixture
def second_like(second_photo, second_user):
    return Like.objects.create(photo=second_photo, user=second_user)


@pytest.fixture
def photo_list():
    return Photo.objects.bulk_create(
        [
            Photo(
                description="A beautiful sky",
                photographer="Felipe Faria",
            ),
            Photo(
                description="A beautiful city",
                photographer="Felipe Faria",
            ),
            Photo(
                description="A bird flying",
                photographer="Felipe Faria",
            ),
        ]
    )
