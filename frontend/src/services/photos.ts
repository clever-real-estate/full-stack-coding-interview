import type { Photo, PhotoResponse } from "../types";

import api from "./api";

/**
 * Fetches a list of photos with pagination.
 */
export const getPhotos = async (page: number = 1, page_size: number = 10) => {
  const res = await api.get<PhotoResponse>("/photos", {
    params: {
      page,
      page_size,
    },
  });
  return res.data;
};

/**
 * Fetches a list of photos liked by the logged in user
 */
export const getLikedPhotos = async (page: number = 1, page_size: number = 10) => {
  const res = await api.get<PhotoResponse>("/photos/liked", {
    params: {
      page,
      page_size,
    },
  });
  return res.data;
};

/**
 * Toggles the like status of a photo.
 */
export const toggleLikePhoto = async (photoId: number) => {
  const res = await api.post(`/photos/${photoId}/like-toggle/`);
  return res.data;
};

/**
 * Fetches a photo by its ID.
 */
export const getPhotoById = async (photoId?: string) => {
  if (!photoId) return null;
  const res = await api.get<Photo>(`/photos/${photoId}/`);
  return res.data;
};
