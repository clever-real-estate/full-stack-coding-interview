import apiClient from "./apiClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Photo } from "../types/photo";
import { queryClient } from "./apiClient";

const getPhotos = async () => {
  const response = await apiClient.get<Photo[]>("/photos");
  return response.data;
};

const likePhoto = async (photoId: number) => {
  const response = await apiClient.post(`/photos/${photoId}/like`);
  return response.data;
};

const unlikePhoto = async (photoId: number) => {
  const response = await apiClient.delete(`/photos/${photoId}/unlike`);
  return response.data;
};

export const usePhotos = () => {
  return useQuery({ queryKey: ["photos"], queryFn: getPhotos });
};

export const useLikePhoto = () => {
  return useMutation({
    mutationFn: likePhoto,
    onSuccess: (response) => {
      queryClient.setQueryData(["photos"], (old: Photo[]) => {
        return old.map((photo) =>
          photo.id === response.id ? { ...photo, liked: true } : photo
        );
      });
    },
  });
};

export const useUnlikePhoto = () => {
  return useMutation({
    mutationFn: unlikePhoto,
    onSuccess: (response) => {
      queryClient.setQueryData(["photos"], (old: Photo[]) => {
        return old.map((photo) =>
          photo.id === response.id ? { ...photo, liked: false } : photo
        );
      });
    },
  });
};
