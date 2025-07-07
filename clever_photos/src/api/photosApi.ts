import apiClient from "./apiClient";
import { useQuery } from "@tanstack/react-query";
import type { Photo } from "../types/photo";

const getPhotos = async () => {
  const response = await apiClient.get<Photo[]>("/photos");
  return response.data;
};

export const usePhotos = () => {
  return useQuery({ queryKey: ["photos"], queryFn: getPhotos });
};
