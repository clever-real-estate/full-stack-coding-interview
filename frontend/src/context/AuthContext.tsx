import React, { createContext, useState } from 'react';
import api from '../services/api';

// Define the shape of the authentication context
interface AuthContextType {
  token: string | null;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
  register: (u: string, p: string) => Promise<void>;
  resetPassword: (u: string, np: string) => Promise<void>;
}

// Create the AuthContext with default dummy implementations
export const AuthContext = createContext<AuthContextType>({
  token: null,
  register: async () => {},
  login: async () => {},
  logout: () => {},
  resetPassword: async () => {},
});

// AuthProvider component to manage and provide auth state to the app
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize token from localStorage if available
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  /**
   * Register a new user and log them in on success
   * @param username - New user's username
   * @param password - New user's password
   */
  const register = async (username: string, password: string) => {
    await api.post("/api/auth/register/", { username, password });
    await login(username, password); // Automatically log in after registration
  };

  /**
   * Log in a user and store token in localStorage
   * @param username - User's username
   * @param password - User's password
   */
  const login = async (username: string, password: string) => {
    const res = await api.post<{ access: string }>('/api/auth/login/', { username, password });
    localStorage.setItem('token', res.data.access);
    localStorage.setItem('userName', username);
    setToken(res.data.access);
  };

  /**
   * Send password reset request for a given user
   * @param username - Target user's username
   * @param new_password - New password to set
   */
  const resetPassword = async (username: string, new_password: string) => {
    await api.post('/api/auth/passwordreset/', { username, new_password });
  };

  /**
   * Log out the current user and clear stored credentials
   */
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider value={{ token, register, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
