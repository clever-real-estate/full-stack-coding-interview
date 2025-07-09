import React from "react";
import { Navigate, Outlet } from "react-router";
import type { ProtectedRouteProps } from "../types";

import { useAuth } from "../context/auth.context";
import LoadingScreen from "./LoadingScreen";

/**
 * ProtectedRoute component that checks if user is authenticated
 * before allowing access to protected pages.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectTo = "/", children }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render protected content
  return children ? children : <Outlet />;
};

/**
 * PublicRoute component that redirects authenticated users
 * away from public pages.
 *
 */
export const PublicRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo = "/account/photos",
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect authenticated users away from public pages
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render public content
  return children ? children : <Outlet />;
};
