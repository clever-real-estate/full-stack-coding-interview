import { Photo as PhotoType } from "@/types";
import { Photo } from "../Photo";

interface PhotoListProps {
  photos: PhotoType[];
}

export const PhotoList = ({ photos }: PhotoListProps) => {
  return (
    <div>
      {photos.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
};

export default PhotoList;
