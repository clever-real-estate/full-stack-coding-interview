import { createContext, useContext, useEffect, useState } from "react";
import { useIdle } from "react-use";
import { toast } from "sonner";
import type {
  AuthContextType,
  ChangePasswordData,
  ForgotPassword,
  GetUserResponse,
  LoginCredentials,
  RegisterData,
  RegisterResponse,
  User,
} from "../types";
import type { ReactNode } from "react";

import { extractErrorMessage } from "../helpers/helpers";
import api from "../services/api";

/**
 * Auth Context for managing authentication state and actions
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook used to access the AuthContext.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isIdle = useIdle(20 * 60 * 1000); // 20 minutes in milliseconds

  // If the user is idle for more than 20 minutes, log them out
  useEffect(() => {
    if (isIdle) {
      if (isAuthenticated && user) {
        logout();
        toast.info("You have been logged out due to inactivity.", {
          duration: 5000,
        });
      }
    }
  }, [isAuthenticated, isIdle, user]);

  /**
   * Method used to fetch the user's profile.
   *
   * This method checks if the user is authenticated and retrieves their profile data.
   */
  const getProfile = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<GetUserResponse>("/auth/is-authenticated/");
      if (response.data.authenticated) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
      return response.data.user;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // fail silently
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user profile on initial load
  useEffect(() => {
    getProfile();
  }, []);

  /**
   * Method used to log a user in
   */
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      // Send login request to the API
      await api.post<{ success: boolean }>("/auth/login/", credentials);
      // if no error, get the user's profile
      await getProfile();
      // Welcome the user
      toast.success("Login successful", {
        description: `Welcome back, ${user?.first_name || "User"}!`,
      });
      return true;
    } catch (error: any) {
      // If login fails, let the user know
      toast.error("Login failed", {
        description: extractErrorMessage(error?.response?.data || error),
      });
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  };

  /**
   * Method used to register a new user
   */
  const register = async (data: RegisterData) => {
    try {
      // Make the API call to register the user
      await api.post<RegisterResponse>("/auth/register/", data);
      // If registration is successful, let the user know
      toast.success("Registration successful", {
        description: "You can now log in with your new account.",
      });
      return true;
    } catch (e: any) {
      // If registration fails, let the user know
      toast.error("Registration failed", {
        description: extractErrorMessage(e?.response?.data || e),
      });
      return false;
    }
  };

  /**
   * Method used to start the password reset process
   */
  const forgotPassword = async (data: ForgotPassword) => {
    try {
      // Send a request to the API to initiate the password reset process
      await api.post("/auth/forgot-password/", data);
      toast.success("Request Sent", {
        description: "Please check your email for further instructions.",
        duration: 12000,
      });
      return true;
    } catch (error: any) {
      // Handle errors and show a toast notification
      toast.error("Failed to send reset link", {
        description: extractErrorMessage(error?.response?.data || error),
      });
      return false;
    }
  };

  /**
   * Method used to log a user out
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Send api request
      await api.post("/auth/logout/");
      // Clear auth state
      setUser(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      toast.error("Logout failed", {
        description: extractErrorMessage(error?.response?.data || error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Method used to update the user's profile information.
   */
  const updateProfile = async (data: Partial<User>): Promise<Partial<User>> => {
    try {
      // Update user profile
      const response = await api.patch<{ message: string; user: Partial<User> }>(
        "/auth/update-profile/",
        {
          first_name: data.first_name,
          last_name: data.last_name,
        }
      );
      // Reload user profile
      await getProfile();
      // Show success message
      toast.success("Profile updated successfully", {
        description: "Your profile has been updated.",
      });
      return response.data.user;
    } catch (error: any) {
      toast.error("Failed to update profile", {
        description: extractErrorMessage(error?.response?.data || error),
      });
      throw error;
    }
  };

  /**
   * Method used to change the user's password.
   */
  const changePassword = async (data: ChangePasswordData) => {
    try {
      // Update user password
      await api.post("/auth/change-password/", {
        old_password: data.old_password,
        new_password: data.new_password,
      });
      toast.success("Password updated successfully", {
        description: "Your password has been changed.",
      });
      return true;
    } catch (error: any) {
      toast.error("Failed to update password", {
        description: extractErrorMessage(error?.response?.data || error),
      });
      return false;
    }
  };

  // Context value
  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    forgotPassword,
    getProfile,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the context for advanced use cases
export { AuthContext };
