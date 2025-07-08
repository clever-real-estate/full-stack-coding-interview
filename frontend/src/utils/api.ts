// API client for backend communication
import { ApiClientConfig, RequestOptions, ApiError } from '@/types/api';
import { TokenStorage } from './storage';

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 10000;
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const accessToken = TokenStorage.getAccessToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authorization header if token exists
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const config: RequestInit = {
      method: options.method || 'GET',
      headers,
      body: options.body,
      signal: AbortSignal.timeout(this.timeout),
    };

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        const refreshToken = TokenStorage.getRefreshToken();
        if (refreshToken) {
          const newToken = await this.refreshAccessToken(refreshToken);
          if (newToken) {
            // Retry the original request with new token
            headers.Authorization = `Bearer ${newToken}`;
            const retryResponse = await fetch(url, { ...config, headers });
            if (retryResponse.ok) {
              return await retryResponse.json();
            }
          }
        }
        // Clear tokens and throw error
        TokenStorage.clearTokens();
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'An error occurred' }));
        const error: ApiError = {
          detail: errorData.detail || `HTTP ${response.status}`,
          errors: errorData.errors,
        };
        throw error;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return response.text() as unknown as T;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Network error');
    }
  }

  private async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseURL}/auth/token/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        TokenStorage.setTokens(data.access, refreshToken);
        return data.access;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return null;
  }

  // HTTP methods
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

// Authentication API
export const AuthAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/token/', { email, password }),
  
  register: (userData: { email: string; password: string; first_name: string; last_name: string }) =>
    apiClient.post('/auth/register/', userData),
  
  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout/', { refresh: refreshToken }),
  
  getCurrentUser: () =>
    apiClient.get('/auth/user/'),
  
  refreshToken: (refreshToken: string) =>
    apiClient.post('/auth/token/refresh/', { refresh: refreshToken }),
};

// Photos API
export const PhotosAPI = {
  getPhotos: (page: number = 1, pageSize: number = 10) =>
    apiClient.get(`/photos/?page=${page}&page_size=${pageSize}`),
  
  getPhoto: (id: string) =>
    apiClient.get(`/photos/${id}/`),
  
  likePhoto: (id: string) =>
    apiClient.post(`/photos/${id}/like/`),
  
  getPhotoLikes: (id: string) =>
    apiClient.get(`/photos/${id}/likes/`),
  
  searchPhotos: (query: string, page: number = 1) =>
    apiClient.get(`/photos/search/?q=${encodeURIComponent(query)}&page=${page}`),
  
  getPopularPhotos: (page: number = 1) =>
    apiClient.get(`/photos/popular/?page=${page}`),
};

// Likes API
export const LikesAPI = {
  getMyLikes: (page: number = 1) =>
    apiClient.get(`/likes/my_likes/?page=${page}`),
  
  getLikeStats: () =>
    apiClient.get('/likes/stats/'),
  
  getPhotoLikes: (photoId: string) =>
    apiClient.get(`/likes/photo_likes/?photo_id=${photoId}`),
};