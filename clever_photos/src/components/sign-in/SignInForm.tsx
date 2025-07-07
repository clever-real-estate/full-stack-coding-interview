import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { AxiosError } from "axios";
import { Input } from "../shared/Input";
import { Button } from "../shared/Button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

export const SignInForm = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await login(data.username, data.password);
      showToast("Login successful", "success");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        showToast(err.response?.data || "Login failed", "error");
      }
    }
  };
  return (
    <form className="w-full mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
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
  );
};
