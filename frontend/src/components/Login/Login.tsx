import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";

import logo from "@/assets/logo.svg";
import { AuthCredentials } from "@/redux/types";
import { Errors } from "@/types";
import React from "react";

interface LoginProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  data: AuthCredentials;
  isLoading: boolean;
  errors: Errors;
}

export const Login = ({
  onChange,
  onSubmit,
  data,
  isLoading,
  errors,
}: LoginProps) => {
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
        {!!errors.detail && (
          <Alert variant="soft" color="danger" sx={{ mt: 3 }}>
            {errors.detail}
          </Alert>
        )}
        <Stack spacing={3} mt={3}>
          <FormControl error={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              size="lg"
              name="username"
              onChange={onChange}
              value={data.username}
            />
            {!!errors.username && (
              <FormHelperText>{errors.username}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.password}>
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
            {!!errors.password && (
              <FormHelperText>{errors.password}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <Button loading={isLoading} type="submit">
              Sign in
            </Button>
          </FormControl>
        </Stack>
      </form>
    </Card>
  );
};

export default Login;
