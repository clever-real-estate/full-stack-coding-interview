from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User

class AccountsTests(APITestCase):
    """
    Test suite for user registration, password reset, and authentication token retrieval.
    """

    def setUp(self):
        """
        Set up a default user for use in tests that require authentication or password reset.
        """
        self.username = "testuser"
        self.password = "strongpass123"
        User.objects.create_user(username=self.username, password=self.password)

    def test_register_success(self):
        """
        Ensure a new user can successfully register.
        Verifies 201 response, detail message, and user existence in database.
        """
        url = reverse('auth_register')
        data = {
            'username': 'newuser',
            'password': 'newpass123'
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('detail', response.data)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_password_reset_success(self):
        """
        Ensure a valid user can reset their password successfully.
        Verifies 200 response and confirms password update.
        """
        url = reverse('password_reset')
        new_pass = 'newstrong123'
        data = {'username': self.username, 'new_password': new_pass}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Confirm that the user's password has been updated
        user = User.objects.get(username=self.username)
        self.assertTrue(user.check_password(new_pass))

    def test_password_reset_invalid_user(self):
        """
        Ensure the API returns an error when trying to reset password for a non-existent user.
        Verifies 400 response and presence of error detail.
        """
        url = reverse('password_reset')
        data = {'username': 'nosuchuser', 'new_password': 'irrelevant'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('detail', response.data)

    def test_token_obtain_pair(self):
        """
        Ensure a valid user can obtain JWT tokens.
        Verifies 200 response and presence of access and refresh tokens.
        """
        url = reverse('token_obtain_pair')
        data = {'username': self.username, 'password': self.password}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
