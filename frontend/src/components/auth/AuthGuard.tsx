'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  fallback,
  redirectTo = ROUTES.SIGNIN 
}: AuthGuardProps) {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while loading
    if (loading) return;

    // If not authenticated and not already on auth pages, redirect
    if (!isAuthenticated && !loading) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  // Show loading state
  if (loading) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show fallback if not authenticated
  if (!isAuthenticated || !user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be signed in to access this page.</p>
          <button
            onClick={() => router.push(ROUTES.SIGNIN)}
            className="btn-primary"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
}

// Higher-order component version
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    fallback?: React.ReactNode;
    redirectTo?: string;
  }
) {
  return function AuthGuardedComponent(props: P) {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    );
  };
}