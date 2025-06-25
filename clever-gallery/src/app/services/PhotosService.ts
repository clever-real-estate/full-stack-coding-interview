import { Photo } from "../model/Photo";

function updateFavoriteStatus(
  photos: Photo[],
  photoId: string,
  isFavorite: boolean
): Photo[] {
  return photos.map(photo =>
    photo.id === photoId ? { ...photo, isFavorite } : photo
  );
}

export class PhotosService {
  static async getAll(): Promise<Photo[]> {
    const res = await fetch("/api/photos", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Error gtting photos");
    }

    const data: { photos: Photo[] } = await res.json();
    return data.photos;
  }

  static async addToFavorites(photoId: string, photos: Photo[]): Promise<Photo[]> {
    const res = await fetch("/api/favorites", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photoId }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to add to favorites");
    }

    const newPhotos = updateFavoriteStatus(photos, photoId, true)
    return newPhotos
  }

  static async removeFromFavorites(photoId: string, photos: Photo[]): Promise<Photo[]> {
    const res = await fetch(`/api/favorites?photoId=${photoId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to remove from favorites");
    }

    const newPhotos = updateFavoriteStatus(photos, photoId, false)
    return newPhotos
  }
}
