import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import logo from "/logo.svg";
import { Input } from "../components/shared/Input";
import { Button } from "../components/shared/Button";

const schema = yup.object({
  username: yup
    .string()
    .email("Enter a valid email")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormData = yup.InferType<typeof schema>;

const SignInPage: React.FC = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    login(data.username, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full">
      <div className="w-full max-w-md bg-white rounded-lg p-8 flex flex-col items-center">
        <img src={logo} alt="logo" className="w-16 h-16 mb-6" />
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Sign in to your account
        </h2>
        <form
          className="w-full mt-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="mb-4">
            <Input
              id="username"
              type="email"
              label="Username"
              autoComplete="username"
              {...register("username")}
              error={errors.username?.message}
            />
          </div>
          <div className="mb-4">
            <div className="relative mb-6">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label={
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm">Password</span>
                    <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                }
                autoComplete="current-password"
                {...register("password")}
                trailingIcon={
                  showPassword ? (
                    <EyeIcon
                      className="w-4 h-4 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeOffIcon
                      className="w-4 h-4 text-gray-500 cursor-pointer "
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
                error={errors.password?.message}
              />
            </div>
          </div>

          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
