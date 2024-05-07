import pytest
from rest_framework import status


@pytest.mark.django_db
def test_photo_list_with_authenticated_user(api_client, photo_list, user):
    api_client.force_authenticate(user=user)

    response = api_client.get("/api/photos/")

    assert response.status_code == status.HTTP_200_OK
    assert len(response.data) == 3
    assert response.data[0]["description"] == photo_list[0].description


@pytest.mark.django_db
def test_photo_list_with_anonimous_user(api_client, photo_list):
    response = api_client.get("/api/photos/")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_photo_that_user_liked(api_client, photo, user, like):
    api_client.force_authenticate(user=user)
    response = api_client.get("/api/photos/")

    assert response.status_code == status.HTTP_200_OK
    assert response.data[0]["likes"] == 1
    assert response.data[0]["liked"] == True


@pytest.mark.django_db
def test_photo_that_user_never_liked(api_client, photo, user):
    api_client.force_authenticate(user=user)
    response = api_client.get("/api/photos/")

    assert response.status_code == status.HTTP_200_OK
    assert response.data[0]["likes"] == 0
    assert response.data[0]["liked"] == False


@pytest.mark.django_db
def test_photo_that_another_user_liked(
    api_client, second_photo, user, second_user, second_like
):
    api_client.force_authenticate(user=user)
    response = api_client.get("/api/photos/")

    assert response.status_code == status.HTTP_200_OK
    assert response.data[0]["likes"] == 1
    assert response.data[0]["liked"] == False
