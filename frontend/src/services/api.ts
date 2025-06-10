import axios from 'axios';

// Set the base API URL from environment variables or use localhost as fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: API_URL,
});

/**
 * Axios request interceptor to attach the Authorization header if a token exists.
 * This ensures authenticated API requests by including the Bearer token from localStorage.
 */
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;
