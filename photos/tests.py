from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from photos.models import Photo, Photographer, UserPhoto

User = get_user_model()


class PhotoViewSetTestCase(APITestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        # Create a photographer
        test_url = 'https://www.gstatic.com/webp/gallery/1.jpg'
        self.photographer = Photographer.objects.create(name='John Doe', photographer_id=123, portfolio=test_url)
        # Create a photo
        self.photo = Photo.objects.create(
            photographer=self.photographer,
            photo_id=1,
            width=1024,
            height=768,
            url=test_url,
            avg_color='#FFFFFF',
            original_url=test_url,
            large2x_url=test_url,
            large_url=test_url,
            medium_url=test_url,
            small_url=test_url,
            portrait_url=test_url,
            landscape_url=test_url,
            tiny_url=test_url,
            description=test_url
        )
        self.user.photos.add(self.photo)

    def test_list_photos(self):
        self.client.login(email='test@example.com', password='testpassword')
        url = reverse('photo-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Ensure one photo is returned

    def test_toggle_like_photo(self):
        self.client.login(email='test@example.com', password='testpassword')
        url = reverse('photo-like', args=[self.photo.id])  # Assume 'photo-like' is your URL name for the like action
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(UserPhoto.objects.get(user=self.user, photo=self.photo).liked)
