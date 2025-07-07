import { useMutation } from "@tanstack/react-query";
import apiClient from "./apiClient";
import type { User } from "../types/user";

interface LoginCredentials {
  user: {
    email: string;
    password: string;
  };
}

interface LoginResponse {
  token: string | null;
  user: User | null;
}

const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse | undefined> => {
  const response = await apiClient.post("/users/sign_in", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const token = response.headers["authorization"];
    console.log("Response:", response.data);
    return {
      token: token,
      user: response.data.user,
    };
  } else {
    return {
      token: null,
      user: null,
    };
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
  });
};
