import { createContext, useContext } from "react";
import type { LoginResponse } from "../api/authApi";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<LoginResponse | undefined>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  login: () => Promise.resolve(undefined),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
