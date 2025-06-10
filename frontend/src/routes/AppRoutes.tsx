// src/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/auth/SignIn/SignIn';
import SignUp from '../pages/auth/SignUp/SignUp';
import ResetPassword from '../pages/auth/ResetPassword/ResetPassword';
import Photos from '../pages/photos/Photos';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute wraps a route and ensures that only authenticated users can access it.
 * If the user is not authenticated, they are redirected to the sign-in page.
 */
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/signin" replace />;
};

/**
 * AppRoutes defines all application routes and handles redirects based on auth state.
 */
const AppRoutes: React.FC = () => {
  const { token } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected route */}
      <Route
        path="/photos"
        element={
          <ProtectedRoute>
            <Photos />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route redirects based on auth status */}
      <Route
        path="*"
        element={<Navigate to={token ? '/photos' : '/signin'} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
