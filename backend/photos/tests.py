from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from .models import Photo, Like
import json

class PhotoModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.photo = Photo.objects.create(
            width=1920,
            height=1080,
            url='https://example.com/photo',
            photographer='John Doe',
            photographer_url='https://example.com/john',
            photographer_id=123,
            avg_color='#FF5733',
            src_original='https://example.com/original.jpg',
            src_large2x='https://example.com/large2x.jpg',
            src_large='https://example.com/large.jpg',
            src_medium='https://example.com/medium.jpg',
            src_small='https://example.com/small.jpg',
            src_portrait='https://example.com/portrait.jpg',
            src_landscape='https://example.com/landscape.jpg',
            src_tiny='https://example.com/tiny.jpg',
            alt='Beautiful landscape'
        )
        assert self.photo.id is not None

    def test_photo_creation(self):
        self.assertEqual(self.photo.photographer, 'John Doe')
        self.assertEqual(self.photo.alt, 'Beautiful landscape')
        self.assertEqual(self.photo.width, 1920)
        self.assertEqual(self.photo.height, 1080)

    def test_photo_str_representation(self):
        expected = f"{self.photo.photographer} - {self.photo.alt}"
        self.assertEqual(str(self.photo), expected)

class LikeModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.photo = Photo.objects.create(
            width=1920,
            height=1080,
            url='https://example.com/photo',
            photographer='John Doe',
            photographer_url='https://example.com/john',
            photographer_id=123,
            avg_color='#FF5733',
            src_original='https://example.com/original.jpg',
            src_large2x='https://example.com/large2x.jpg',
            src_large='https://example.com/large.jpg',
            src_medium='https://example.com/medium.jpg',
            src_small='https://example.com/small.jpg',
            src_portrait='https://example.com/portrait.jpg',
            src_landscape='https://example.com/landscape.jpg',
            src_tiny='https://example.com/tiny.jpg',
            alt='Beautiful landscape'
        )
        assert self.photo.id is not None

    def test_like_creation(self):
        like = Like.objects.create(user=self.user, photo=self.photo)
        self.assertEqual(like.user, self.user)
        self.assertEqual(like.photo, self.photo)

    def test_like_str_representation(self):
        like = Like.objects.create(user=self.user, photo=self.photo)
        expected = f"{self.user.username} likes {self.photo.photographer} - {self.photo.alt}"
        self.assertEqual(str(like), expected)

    def test_unique_user_photo_combination(self):
        Like.objects.create(user=self.user, photo=self.photo)
        with self.assertRaises(Exception):
            Like.objects.create(user=self.user, photo=self.photo)

class PhotoAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.photo = Photo.objects.create(
            width=1920,
            height=1080,
            url='https://example.com/photo',
            photographer='John Doe',
            photographer_url='https://example.com/john',
            photographer_id=123,
            avg_color='#FF5733',
            src_original='https://example.com/original.jpg',
            src_large2x='https://example.com/large2x.jpg',
            src_large='https://example.com/large.jpg',
            src_medium='https://example.com/medium.jpg',
            src_small='https://example.com/small.jpg',
            src_portrait='https://example.com/portrait.jpg',
            src_landscape='https://example.com/landscape.jpg',
            src_tiny='https://example.com/tiny.jpg',
            alt='Beautiful landscape'
        )
        assert self.photo.id is not None

    def test_get_photos_list(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('photos')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['photographer'], 'John Doe')

    def test_like_photo_authenticated(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('like', args=[self.photo.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Like.objects.filter(user=self.user, photo=self.photo).exists())

    def test_like_photo_unauthenticated(self):
        url = reverse('like', args=[self.photo.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unlike_photo(self):
        Like.objects.create(user=self.user, photo=self.photo)
        self.client.force_authenticate(user=self.user)
        url = reverse('like', args=[self.photo.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Like.objects.filter(user=self.user, photo=self.photo).exists())

class AuthAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )

    def test_login_success(self):
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['username'], 'testuser')

    def test_login_invalid_credentials(self):
        url = reverse('login')
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_success(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('logout')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_logout_unauthenticated(self):
        url = reverse('logout')
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
