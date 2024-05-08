import logo from "@/assets/logo.svg";
import { Photo as PhotoType } from "@/types";
import { Box, Button, Stack, Typography } from "@mui/joy";
import { Photo } from "../Photo";

interface PhotoListProps {
  photos: PhotoType[];
  onLike: (id: number) => void;
  onLogout: () => void;
}

export const PhotoList = ({ photos, onLike, onLogout }: PhotoListProps) => {
  return (
    <Stack spacing={1} sx={{ maxWidth: 480, mx: "auto" }}>
      <Stack alignItems={"center"} spacing={1} sx={{ py: 3 }}>
        <Box>
          <img src={logo} alt="Clever" />
        </Box>
        <Typography level="h4" textAlign="center">
          All photos
        </Typography>
        <Button size="sm" variant="soft" onClick={onLogout}>
          Logout
        </Button>
      </Stack>
      {photos.map((photo) => (
        <Photo key={photo.id} photo={photo} onLike={onLike} />
      ))}
    </Stack>
  );
};

export default PhotoList;
