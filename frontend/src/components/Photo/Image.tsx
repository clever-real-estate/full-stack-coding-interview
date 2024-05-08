import { styled } from "@mui/joy/styles";

export const Image = styled("img")(({ theme }) => ({
  width: 75,
  height: 75,
  objectFit: "cover",
  borderRadius: theme.vars.radius.sm,
}));
