import type { Photo } from "../../types/photo";
import { PhotoItem } from "./PhotoItem";

export const PhotoList = ({ photos }: { photos: Photo[] }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {photos.map((photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
  );
};
