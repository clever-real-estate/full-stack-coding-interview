import api from './api';
import { Photo } from '../types';

/**
 * Fetches a list of photos from the backend API.
 * @returns Promise resolving to an array of Photo objects.
 */
export const fetchPhotos = async (): Promise<Photo[]> => {
  const res = await api.get<Photo[]>('/api/photos/');
  return res.data;
};

/**
 * Sends a request to like a photo.
 * @param id - The ID of the photo to like.
 */
export const likePhoto = async (id: number): Promise<void> => {
  await api.post(`/api/photos/${id}/like/`);
};

/**
 * Sends a request to unlike a photo.
 * @param id - The ID of the photo to unlike.
 */
export const unlikePhoto = async (id: number): Promise<void> => {
  await api.delete(`/api/photos/${id}/like/`);
};
