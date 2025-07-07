import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 401 && response.config.url !== "/users/sign_in") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/sign-in";
      return Promise.reject(new Error("Unauthorized"));
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { queryClient };

export default apiClient;
