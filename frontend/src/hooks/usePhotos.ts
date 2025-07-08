'use client';

import { useState, useEffect, useCallback } from 'react';
import { Photo, PhotosResponse, LikeResponse } from '@/types/photo';
import { PhotosAPI } from '@/utils/api';

interface UsePhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface UsePhotosReturn extends UsePhotosState {
  fetchPhotos: (page?: number) => Promise<void>;
  likePhoto: (photoId: string) => Promise<void>;
  refreshPhotos: () => Promise<void>;
  goToNextPage: () => Promise<void>;
  goToPreviousPage: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  clearError: () => void;
}

export function usePhotos(initialPage: number = 1): UsePhotosReturn {
  const [state, setState] = useState<UsePhotosState>({
    photos: [],
    loading: true,
    error: null,
    currentPage: initialPage,
    totalPages: 0,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const fetchPhotos = useCallback(async (page: number = state.currentPage) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response = await PhotosAPI.getPhotos(page, 10) as PhotosResponse;

      setState(prev => ({
        ...prev,
        photos: response.results,
        currentPage: page,
        totalPages: Math.ceil(response.count / 10),
        totalCount: response.count,
        hasNextPage: !!response.next,
        hasPreviousPage: !!response.previous,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch photos',
      }));
    }
  }, [state.currentPage]);

  const likePhoto = useCallback(async (photoId: string) => {
    try {
      const response = await PhotosAPI.likePhoto(photoId) as LikeResponse;

      // Update the photo in the current photos array
      setState(prev => ({
        ...prev,
        photos: prev.photos.map(photo =>
          photo.id === photoId
            ? {
                ...photo,
                user_liked: response.liked,
                like_count: response.like_count,
              }
            : photo
        ),
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to like photo',
      }));
    }
  }, []);

  const refreshPhotos = useCallback(async () => {
    await fetchPhotos(state.currentPage);
  }, [fetchPhotos, state.currentPage]);

  const goToNextPage = useCallback(async () => {
    if (state.hasNextPage) {
      await fetchPhotos(state.currentPage + 1);
    }
  }, [fetchPhotos, state.currentPage, state.hasNextPage]);

  const goToPreviousPage = useCallback(async () => {
    if (state.hasPreviousPage) {
      await fetchPhotos(state.currentPage - 1);
    }
  }, [fetchPhotos, state.currentPage, state.hasPreviousPage]);

  const goToPage = useCallback(async (page: number) => {
    if (page >= 1 && page <= state.totalPages) {
      await fetchPhotos(page);
    }
  }, [fetchPhotos, state.totalPages]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchPhotos(initialPage);
  }, [initialPage, fetchPhotos]); // Include fetchPhotos dependency

  return {
    ...state,
    fetchPhotos,
    likePhoto,
    refreshPhotos,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    clearError,
  };
}

// Hook for individual photo
export function usePhoto(photoId: string) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPhoto = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const photoData = await PhotosAPI.getPhoto(photoId) as Photo;
      setPhoto(photoData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch photo');
    } finally {
      setLoading(false);
    }
  }, [photoId]);

  const likePhoto = useCallback(async () => {
    if (!photo) return;

    try {
      const response = await PhotosAPI.likePhoto(photo.id) as LikeResponse;
      setPhoto(prev => prev ? {
        ...prev,
        user_liked: response.liked,
        like_count: response.like_count,
      } : null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to like photo');
    }
  }, [photo]);

  useEffect(() => {
    if (photoId) {
      fetchPhoto();
    }
  }, [photoId, fetchPhoto]);

  return {
    photo,
    loading,
    error,
    likePhoto,
    refreshPhoto: fetchPhoto,
    clearError: () => setError(null),
  };
}