// Authentication types
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  total_likes?: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { email: string; password: string; first_name: string; last_name: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}