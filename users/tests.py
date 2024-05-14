from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAccountTests(APITestCase):

    def setUp(self):
        # Create a user to test login and logout
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword123')
        self.create_url = reverse('register')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')

    def test_create_user_successfully(self):
        """
        Ensure we can create a new user and a session id is created with it.
        """
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpassword123'
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('email' in response.data)
        new_user = User.objects.last()
        self.assertEqual(new_user.email, data['email'])
        self.assertEqual(new_user.username, data['username'])

    def test_user_login(self):
        """
        Ensure we can login a user with username and password.
        """
        data = {
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['email'], data['email'])
        self.assertTrue('sessionid' in response.cookies)

    def test_user_logout(self):
        """
        Ensure we can log out a user.
        """
        self.client.login(email='test@example.com', password='testpassword123')
        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual('', response.cookies.get('sessionid').value)

    def test_user_already_logged_in(self):
        """
        Ensure that a user already logged in receives the correct response when trying to log in again.
        """
        self.client.login(email='test@example.com', password='testpassword123')
        data = {
            'email': 'test@example.com',
            'password': 'testpassword123'
        }
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'You are already logged in.')

