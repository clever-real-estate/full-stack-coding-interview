import { Loader2 } from "lucide-react";
import { usePhotos } from "../../api/photosApi";
import { PhotoItem } from "./PhotoItem";

export const PhotoList = () => {
  const { data: photos, isLoading, isError, error } = usePhotos();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-6 h-6 animate-spin dark:text-white text-black" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center text-red-500">
          Error loading photos: {error?.message}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {photos &&
        photos.map((photo) => <PhotoItem key={photo.id} photo={photo} />)}
    </div>
  );
};
