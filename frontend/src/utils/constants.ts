// Application constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const ROUTES = {
  SIGNIN: '/signin',
  GALLERY: '/gallery',
  HOME: '/',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/token/',
    REFRESH: '/auth/token/refresh/',
    LOGOUT: '/auth/logout/',
    USER: '/auth/user/',
  },
  PHOTOS: {
    LIST: '/photos/',
    DETAIL: (id: string) => `/photos/${id}/`,
    LIKE: (id: string) => `/photos/${id}/like/`,
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;