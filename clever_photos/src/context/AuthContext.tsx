import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "../hooks/useAuth";
import { useLogin } from "../api/authApi";
import type { User } from "../types/user";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const { mutateAsync: login } = useLogin();

  const handleLogin = async (email: string, password: string) => {
    const response = await login(
      { user: { email, password } },
      {
        onSuccess: (data) => {
          if (data?.token && data?.user) {
            setToken(data.token);
            setUser(data.user);
          }
        },
        onError: (error: Error) => {
          console.error("Login failed:", error);
          throw error;
        },
      }
    );

    return response;
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    isAuthenticated,
    token,
    login: handleLogin,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
