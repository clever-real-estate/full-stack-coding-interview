import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";

import logo from "../../assets/logo.svg";

export const Login = () => {
  return (
    <Card variant="plain" sx={{ maxWidth: 400, mx: "auto" }}>
      <form>
        <Stack alignItems={"center"} spacing={1}>
          <Box>
            <img src={logo} alt="Clever" />
          </Box>
          <Typography level="h4" textAlign="center">
            Sign in to your account
          </Typography>
        </Stack>
        <Stack spacing={3} mt={3}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input size="lg" />
          </FormControl>
          <FormControl>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="start"
            >
              <FormLabel>Password</FormLabel>
              <Link level="body-sm">Forgot password?</Link>
            </Stack>
            <Input size="lg" />
          </FormControl>
          <FormControl>
            <Button>Sign in</Button>
          </FormControl>
        </Stack>
      </form>
    </Card>
  );
};

export default Login;
