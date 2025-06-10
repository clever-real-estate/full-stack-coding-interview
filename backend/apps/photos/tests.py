from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Photo, Like

class PhotosTests(APITestCase):
    """
    Test suite for photo listing and like/unlike functionality.
    Includes authentication checks and edge case handling.
    """

    def setUp(self):
        """
        Create a test user, authenticate with JWT, and create test photo entries.
        """
        # Create user and obtain JWT access token
        self.user = User.objects.create_user(username='photo_user', password='photo_pass')
        token_url = reverse('token_obtain_pair')
        resp = self.client.post(token_url, {'username': 'photo_user', 'password': 'photo_pass'}, format='json')
        self.token = resp.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        # Create sample photo records
        Photo.objects.create(
            photo_id=1, photographer='Alice', alt='Alt1', avg_color='#000000',
            portfolio='http://port', medium_src='http://img1'
        )
        Photo.objects.create(
            photo_id=2, photographer='Bob', alt='Alt2', avg_color='#FFFFFF',
            portfolio='http://port2', medium_src='http://img2'
        )

    def test_list_photos_authenticated(self):
        """
        Ensure an authenticated user can retrieve the list of photos.
        """
        url = reverse('photo_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Expect 2 photos

    def test_list_photos_unauthenticated(self):
        """
        Ensure unauthenticated users are denied access to the photo list.
        """
        self.client.credentials()  # Clear authentication headers
        url = reverse('photo_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_like_and_unlike(self):
        """
        Test the like and unlike behavior for a photo.
        - User can like a photo once (201)
        - Duplicate likes are rejected (400)
        - User can unlike the photo (204)
        """
        like_url = reverse('photo_like', args=[1])

        # Like the photo
        response = self.client.post(like_url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Attempt to like again (should fail)
        response2 = self.client.post(like_url)
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)

        # Unlike the photo
        response3 = self.client.delete(like_url)
        self.assertEqual(response3.status_code, status.HTTP_204_NO_CONTENT)

    def test_like_requires_auth(self):
        """
        Ensure that liking a photo requires authentication.
        """
        self.client.credentials()  # Clear authentication
        like_url = reverse('photo_like', args=[1])
        response = self.client.post(like_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
