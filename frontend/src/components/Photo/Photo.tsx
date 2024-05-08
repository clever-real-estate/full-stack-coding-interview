import { Photo as PhotoType } from "@/types";
import LinkIcon from "@mui/icons-material/Link";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Box, Card, Link, Stack, Typography } from "@mui/joy";
import { Color } from "./Color";
import { Image } from "./Image";
import { Like } from "./Like";

interface PhotoProps {
  photo: PhotoType;
  onLike: (id: number) => void;
}

export const Photo = ({ photo, onLike }: PhotoProps) => {
  return (
    <Card variant="plain" sx={{ maxWidth: 450, mx: "auto" }}>
      <Stack direction={"row"} spacing={2}>
        <Box>
          <Like onClick={() => onLike(photo.id)}>
            {photo.liked ? <StarIcon color="warning" /> : <StarOutlineIcon />}
          </Like>
        </Box>
        <Box>
          <Image src={photo.image.medium} alt={photo.description} />
        </Box>
        <Box>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography level="title-sm" fontWeight={"bold"}>
              {photo.photographer}
            </Typography>
            {photo.photographer_url && (
              <Link level="body-sm" href={photo.photographer_url}>
                <LinkIcon />
                Portfolio
              </Link>
            )}
          </Stack>
          {photo.description && (
            <Typography level="body-sm">{photo.description}</Typography>
          )}
          {photo.color && (
            <Color level="body-sm" customcolor={photo.color}>
              {photo.color}
            </Color>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default Photo;
