import pytest
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_photo_list_unauthenticated():
    client = APIClient()
    response = client.get("/api/photos/")
    assert response.status_code == 401


@pytest.mark.django_db
def test_register_user():
    client = APIClient()
    payload = {
        "username": "newuser",
        "email": "newuser@example.com",
        "first_name": "New",
        "last_name": "User",
        "password": "strongpassword123",
    }
    response = client.post("/api/auth/register/", payload)
    assert response.status_code == 201 or response.status_code == 200
