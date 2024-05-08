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

import React from "react";
import logo from "../../assets/logo.svg";
import { AuthCredentials } from "../../redux/types";

interface LoginProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  data: AuthCredentials;
}

export const Login = ({ onChange, onSubmit, data }: LoginProps) => {
  return (
    <Card variant="plain" sx={{ maxWidth: 400, mx: "auto" }}>
      <form onSubmit={onSubmit}>
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
            <Input
              size="lg"
              name="username"
              onChange={onChange}
              value={data.username}
            />
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
            <Input
              size="lg"
              type="password"
              name="password"
              onChange={onChange}
              value={data.password}
            />
          </FormControl>
          <FormControl>
            <Button type="submit">Sign in</Button>
          </FormControl>
        </Stack>
      </form>
    </Card>
  );
};

export default Login;
