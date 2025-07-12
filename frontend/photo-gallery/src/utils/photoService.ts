import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src_original: string;
  src_large2x: string;
  src_large: string;
  src_medium: string;
  src_small: string;
  src_portrait: string;
  src_landscape: string;
  src_tiny: string;
  alt: string;
  is_liked: boolean;
}

class PhotoService {
  async getPhotos(): Promise<Photo[]> {
    try {
      const response = await api.get<Photo[]>('/photos/');
    return response.data;
    } catch (error: any) {
      console.error('Get photos error:', error.response?.data || error.message);
      throw error;
    }
  }

  async likePhoto(photoId: number): Promise<void> {
    try {
      await api.post(`/photos/${photoId}/like/`);
    } catch (error: any) {
      console.error('Like photo error:', error.response?.data || error.message);
      throw error;
    }
  }

  async unlikePhoto(photoId: number): Promise<void> {
    try {
      await api.delete(`/photos/${photoId}/like/`);
    } catch (error: any) {
      console.error('Unlike photo error:', error.response?.data || error.message);
      throw error;
    }
  }
}

export const photoService = new PhotoService();
export type { Photo }; 