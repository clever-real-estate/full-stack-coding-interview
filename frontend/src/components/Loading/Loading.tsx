import { Box, Button } from "@mui/joy";

export const Loading = () => {
  return (
    <Box textAlign="center" padding={5}>
      <Button loading variant="plain" />
    </Box>
  );
};

export default Loading;
