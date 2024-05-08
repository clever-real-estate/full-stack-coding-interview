import { Photo as PhotoType } from "@/types";
import LinkIcon from "@mui/icons-material/Link";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { Box, Card, Link, Stack, Typography } from "@mui/joy";
import { Color } from "./Color";
import { Image } from "./Image";

export const Photo = ({
  photographer,
  photographer_url,
  description,
  image,
  image_url,
  liked,
  likes,
  color,
}: PhotoType) => {
  return (
    <Card variant="plain" sx={{ maxWidth: 450, mx: "auto" }}>
      <Stack direction={"row"} spacing={2}>
        <Box>
          <button style={{ all: "unset" }}>
            {liked ? <StarIcon color="warning" /> : <StarOutlineIcon />}
          </button>
        </Box>
        <Box>
          <Image src={image.medium} alt={description} />
        </Box>
        <Box>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography level="title-sm" fontWeight={"bold"}>
              {photographer}
            </Typography>
            {photographer_url && (
              <Link level="body-sm" href={photographer_url}>
                <LinkIcon />
                Portfolio
              </Link>
            )}
          </Stack>
          {description && (
            <Typography level="body-sm">{description}</Typography>
          )}
          {color && (
            <Color level="body-sm" customcolor={color}>
              {color}
            </Color>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default Photo;
