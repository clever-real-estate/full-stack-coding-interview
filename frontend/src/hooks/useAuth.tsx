'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthContextType, LoginResponse } from '@/types/auth';
import { AuthAPI } from '@/utils/api';
import { TokenStorage } from '@/utils/storage';
import { InputValidator } from '@/utils/validation';

// Auth state interface
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Auth actions
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

// Initial state
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Check if user has valid tokens
      if (TokenStorage.hasValidTokens()) {
        // Try to get current user
        const userData = await AuthAPI.getCurrentUser() as User;
        dispatch({ type: 'SET_USER', payload: userData });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
      // Clear invalid tokens
      TokenStorage.clearTokens();
      dispatch({ type: 'SET_USER', payload: null });
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Validate input
      const sanitizedEmail = InputValidator.sanitizeEmail(email);
      if (!sanitizedEmail) {
        throw new Error('Please enter a valid email address');
      }

      if (!password.trim()) {
        throw new Error('Password is required');
      }

      // Call login API
      const response = await AuthAPI.login(sanitizedEmail, password) as LoginResponse;

      // Store tokens
      TokenStorage.setTokens(response.access, response.refresh);

      // Set user in state
      dispatch({ type: 'SET_USER', payload: response.user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Validate input
      const sanitizedEmail = InputValidator.sanitizeEmail(userData.email);
      if (!sanitizedEmail) {
        throw new Error('Please enter a valid email address');
      }

      const passwordValidation = InputValidator.validatePassword(userData.password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.errors[0]);
      }

      if (!userData.first_name.trim()) {
        throw new Error('First name is required');
      }

      if (!userData.last_name.trim()) {
        throw new Error('Last name is required');
      }

      // Call register API
      const response = await AuthAPI.register({
        ...userData,
        email: sanitizedEmail,
        first_name: userData.first_name.trim(),
        last_name: userData.last_name.trim(),
      }) as LoginResponse;

      // Store tokens
      TokenStorage.setTokens(response.access, response.refresh);

      // Set user in state
      dispatch({ type: 'SET_USER', payload: response.user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const refreshToken = TokenStorage.getRefreshToken();
      
      if (refreshToken) {
        // Call logout API to blacklist the token
        await AuthAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear tokens and user state
      TokenStorage.clearTokens();
      dispatch({ type: 'LOGOUT' });
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      if (state.isAuthenticated) {
        const userData = await AuthAPI.getCurrentUser() as User;
        dispatch({ type: 'SET_USER', payload: userData });
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      // Don't throw error, just log it
    }
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const contextValue: AuthContextType = {
    user: state.user,
    loading: state.loading,
    isAuthenticated: state.isAuthenticated,
    error: state.error,
    login,
    register,
    logout,
    refreshUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;