"use client";

import { useEffect, useState } from "react";
import { Star, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import WithAuthentication from "../middleware/WithAuthentication";
import ImageIcon from "../components/ImageIcon";
import { Photo } from "../model/Photo";
import { PhotosService } from "../services/PhotosService";

function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPhotos = async () => {
      const photosResponse = await PhotosService.getAll();
      setPhotos(photosResponse);
      setLoading(false);
    };
    getPhotos();
  });

  const handleAddToFavorites = async (photoId: string) => {
    await PhotosService.addToFavorites(photoId);
  };

  const handleRemoveFromFavorites = async (photoId: string) => {
    await PhotosService.removeFromFavorites(photoId);
  };

  return (
    <div className="max-w-xl mx-auto p-7">
      <div className="mb-6">
        <div>
          <ImageIcon />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-6">All photos</h1>
      </div>

      {loading ? (
        <div className="flex justify-center ">Loading...</div>
      ) : (
        photos.map((photo: Photo) => (
          <div key={photo.id} className="flex items-center gap-3 mb-6">
            <button
              onClick={() =>
                photo.isFavorite
                  ? handleRemoveFromFavorites(photo.id)
                  : handleAddToFavorites(photo.id)
              }
              className="focus:outline-none hover:cursor-pointer"
              aria-label={photo.isFavorite ? "Unfavorite" : "Favorite"}
            >
              <Star
                className={`w-5 h-5 ${
                  photo.isFavorite
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-400"
                }`}
              />
            </button>

            <div className="flex-shrink-0 w-[75px] h-[75px] bg-gray-200 rounded overflow-hidden">
              {photo.imageUrl ? (
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="object-cover w-full h-full"
                />
              ) : null}
            </div>

            <div className="flex-1">
              <div className="font-bold text-sm text-gray-900">
                {photo.photographer}
              </div>
              <div className="text-gray-800 text-sm">{photo.title}</div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span className="text-sm">{photo.hexColor}</span>
                <span
                  className="w-4 h-4 rounded-sm border"
                  style={{ backgroundColor: photo.hexColor }}
                />
              </div>
            </div>

            <Link
              href={photo.portfolioUrl}
              className="text-[#0075EB] text-xs flex items-center gap-1 hover:underline"
            >
              <LinkIcon size={12} />
              Portfolio
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default WithAuthentication(PhotosPage);
