import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface User {
  id: number;
  username: string;
}

interface LoginResponse {
  message: string;
  user: User;
}

class AuthService {
  async login(username: string, password: string): Promise<User> {
    try {
      const response = await api.post<LoginResponse>('/auth/login/', {
      username,
      password,
    });
    return response.data.user;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout/');
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/user/');
    return response.data;
    } catch (error: any) {
      console.error('Get current user error:', error.response?.data || error.message);
      throw error;
    }
  }
}

export const authService = new AuthService(); 