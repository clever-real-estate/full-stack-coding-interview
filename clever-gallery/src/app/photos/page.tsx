"use client";

import { useEffect, useState } from "react";
import { Star, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import WithAuthentication from "../middleware/WithAuthentication";
import ImageIcon from "../components/ImageIcon";
import { Photo } from "../model/Photo";
import { PhotosService } from "../services/PhotosService";
import { AuthService } from "../services/AuthService";
import { useRouter } from "next/navigation";
import PhotoTile from "../components/PhotoTile";

function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getPhotos = async () => {
      const photosResponse = await PhotosService.getAll();
      setPhotos(photosResponse);
      setLoading(false);
    };
    getPhotos();
  }, []);

  const handleAddToFavorites = async (photoId: string) => {
    const newPhotos = await PhotosService.addToFavorites(photoId, photos);
    setPhotos(newPhotos);
  };

  const handleRemoveFromFavorites = async (photoId: string) => {
    const newPhotos = await PhotosService.removeFromFavorites(photoId, photos);
    setPhotos(newPhotos);
  };

  const handleLogout = async () => {
    await AuthService.logout(router);
  };

  return (
    <div className="max-w-xl mx-auto p-7">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <ImageIcon />
          <span
            className="text-gray-900 text-s hover:cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout
          </span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mt-6">All photos</h1>
      </div>

      {loading ? (
        <div className="flex justify-center ">Loading...</div>
      ) : (
        photos.map((photo: Photo) => (
          <PhotoTile
            {...{
              photo,
              onAddFavorite: handleAddToFavorites,
              onRemoveFavorite: handleRemoveFromFavorites,
            }}
          />
        ))
      )}
    </div>
  );
}

export default WithAuthentication(PhotosPage);
