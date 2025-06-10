import axios from 'axios';
import { AuthResponse, Photo } from '../types';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  signup: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', { email, password });
    return response.data;
  },
};

export const photos = {
  getAll: async (): Promise<Photo[]> => {
    const response = await api.get<Photo[]>('/photos');
    return response.data;
  },

  toggleLike: async (photoId: number): Promise<{ hasLiked: boolean; likes: number }> => {
    const response = await api.post<{ hasLiked: boolean; likes: number }>(`/photos/${photoId}/like`);
    return response.data;
  },
}; 