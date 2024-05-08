import { Typography } from "@mui/joy";
import { styled } from "@mui/joy/styles";

export const Color = styled(Typography)<{ customcolor: string }>(
  ({ theme, customcolor }) => ({
    color: customcolor,
    marginTop: theme.spacing(0.5),
    "&::after": {
      content: '""',
      display: "inline-block",
      width: theme.spacing(2),
      height: theme.spacing(2),
      background: customcolor,
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(-0.2),
    },
  })
);
