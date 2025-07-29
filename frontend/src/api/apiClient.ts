import axios from 'axios';

let logoutUser: () => void;

export const setLogoutUser = (logout: () => void) => {
  logoutUser = logout;
};

const apiClient = axios.create({
  baseURL:'http://localhost:8000/api',
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${apiClient.defaults.baseURL}/token/refresh/`,
            { refresh: refreshToken }
          );
          const { access: newAccessToken } = response.data;
          localStorage.setItem('accessToken', newAccessToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError);
          if (logoutUser) {
            logoutUser();
          }
          return Promise.reject(refreshError);
        }
      } else {
        if (logoutUser) {
          logoutUser();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
