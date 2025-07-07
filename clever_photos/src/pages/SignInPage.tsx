import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await login(data.username, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 mb-6">
          <span className="text-white text-3xl font-bold italic">CI</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Sign in to your account
        </h2>
        <form
          className="w-full mt-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="email"
              autoComplete="username"
              {...register("username")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
