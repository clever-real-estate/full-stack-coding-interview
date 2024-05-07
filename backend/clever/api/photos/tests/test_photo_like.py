import pytest
from rest_framework import status


@pytest.mark.django_db
def test_user_like_photo(api_client, photo, user):
    api_client.force_authenticate(user=user)

    response = api_client.post("/api/photos/like/", data={"photo": photo.id})
    assert response.status_code == status.HTTP_201_CREATED

    response = api_client.get("/api/photos/")
    assert response.data[0]["liked"] == True


@pytest.mark.django_db
def test_user_unlike_photo(api_client, photo, user, like):
    api_client.force_authenticate(user=user)

    response = api_client.post("/api/photos/like/", data={"photo": photo.id})
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = api_client.get("/api/photos/")
    assert response.data[0]["liked"] == False


@pytest.mark.django_db
def test_anonimous_user_like_photo(api_client, photo, user):
    response = api_client.get("/api/photos/like/", data={"photo": photo.id})
    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_user_like_wrong_photo(api_client, photo, user):
    api_client.force_authenticate(user=user)

    response = api_client.post("/api/photos/like/", data={"photo": "1234"})
    assert response.status_code == status.HTTP_400_BAD_REQUEST
