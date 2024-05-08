import { Photo as PhotoType } from "@/types";
import { Photo } from "../Photo";

interface PhotoListProps {
  photos: PhotoType[];
  onLike: (id: number) => void;
}

export const PhotoList = ({ photos, onLike }: PhotoListProps) => {
  return (
    <div>
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} onLike={onLike} />
      ))}
    </div>
  );
};

export default PhotoList;
