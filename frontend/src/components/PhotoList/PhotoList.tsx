import { Photo as PhotoType } from "@/types";
import { Stack } from "@mui/joy";
import { Photo } from "../Photo";

interface PhotoListProps {
  photos: PhotoType[];
  onLike: (id: number) => void;
}

export const PhotoList = ({ photos, onLike }: PhotoListProps) => {
  return (
    <Stack spacing={1} sx={{ maxWidth: 480, mx: "auto" }}>
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} onLike={onLike} />
      ))}
    </Stack>
  );
};

export default PhotoList;
