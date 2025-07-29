import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { jwtDecode } from 'jwt-decode';

import { setLogoutUser } from '@/api/apiClient';

import type { ReactNode } from 'react';
import type { User } from '@/types';

interface AuthContextType {
  user: User | null;
  refreshToken: string | null;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  refreshLogin: (accessToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const logout = useCallback(() => {
    setUser(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);
  const login = (accessToken: string, newRefreshToken: string) => {
    try {
      const decodedToken: User = jwtDecode(accessToken);
      setUser(decodedToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      setRefreshToken(newRefreshToken);
    } catch (error) {
      console.error("Invalid token provided to login function", error);
      logout();
    }
  };
  const refreshLogin = (accessToken: string) => {
    try {
      const decodedToken: User = jwtDecode(accessToken);
      setUser(decodedToken);
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      console.error("Invalid token provided to login function", error);
      logout();
    }
  };

  useEffect(() => {
    setLogoutUser(logout);
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (token) {
      try {
        const decodedToken: User = jwtDecode(token);
        setUser(decodedToken);
        if (storedRefreshToken) {
          setRefreshToken(storedRefreshToken);
        }
      } catch {
        logout();
      }
    }
    setIsLoading(false);
  }, [logout]);
  return (
    <AuthContext.Provider value={{ user, refreshToken, isLoading, login, refreshLogin, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
