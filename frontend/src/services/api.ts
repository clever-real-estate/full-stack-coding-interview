import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { API_BASE_URL, IS_DEV, REQUEST_TIMEOUT } from "../helpers/constants";
import { refreshTokens } from "./auth";

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
});

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.detail || error.response?.data?.message || error.message;

    // Log errors in development
    if (IS_DEV) {
      console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
        status,
        message,
        data: error.response?.data,
      });
    }

    // Handle 401 - Token expired, try to refresh
    if (status === 401) {
      originalRequest._retry = true;

      // Don't try to refresh on auth endpoints to avoid infinite loops
      const isAuthEndpoint = originalRequest.url?.includes("/auth/");
      if (isAuthEndpoint) return Promise.reject(error);

      try {
        const isRefreshed = await refreshTokens();

        // If the refresh was successful, retry the original request
        if (isRefreshed.data.refreshed) {
          // Retry the original request
          return apiClient(originalRequest);
        } else {
          // Reject the promise to propagate the error
          return Promise.reject(new Error("Session expired"));
        }
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API service methods
export const api = {
  // GET request
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return apiClient.get(url, config);
  },

  // POST request
  post: <T = unknown, D = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post(url, data, config);
  },

  // PUT request
  put: <T = unknown, D = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put(url, data, config);
  },

  // PATCH request
  patch: <T = unknown, D = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>> => {
    return apiClient.patch(url, data, config);
  },

  // DELETE request
  delete: <T = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<AxiosResponse<T>> => {
    return apiClient.delete(url, config);
  },
};

// Export the Axios instance for advanced usage
export { apiClient };

// Default export
export default api;
