import { Photo } from "../model/Photo";

export class PhotosService {
  static async getAll(): Promise<Photo[]> {
    const res = await fetch("/api/photos", {
      method: "GET",
      credentials: "include",
    });

    console.log({ res });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Error gtting photos");
    }

    const data: { photos: Photo[] } = await res.json();
    return data.photos;
  }

  static async addToFavorites(photoId: string): Promise<void> {
    console.log("on addToFavorites");
    // const res = await fetch("/api/favorites", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ photoId }),
    // });
    // if (!res.ok) {
    //   const data = await res.json();
    //   throw new Error(data.error || "Failed to add to favorites");
    // }
  }

  static async removeFromFavorites(photoId: string): Promise<void> {
    console.log("on removeFromFavorites");

    // const res = await fetch(`/api/favorites/${photoId}`, {
    //   method: "DELETE",
    //   credentials: "include",
    // });
    // if (!res.ok) {
    //   const data = await res.json();
    //   throw new Error(data.error || "Failed to remove from favorites");
    // }
  }
}
