import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import apiClient from '@/api/apiClient';
import Logo from '@/assets/logo.svg';

const SignInPage = () => {
  const { user, login, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/photos');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setIsSubmitting(true);

    try {
      const credentials = { username, password };
      console.log('Attempting login with:', { username });
      const response = await apiClient.post<{ access: string; refresh: string }>('/token/', credentials);
      const { access, refresh } = response.data;
      login(access, refresh);
      console.log('Login successful, navigating to /photos');
      navigate('/photos');
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      if (err.response && err.response.data) {
        const apiErrors = err.response.data;
        setLocalError(Object.values(apiErrors).flat().join(' ') || 'An unknown error occurred.');
      } else {
        setLocalError('Failed to connect to the server. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <img
              src={Logo}
              alt="Company Logo"
              decoding="async"
              fetchPriority="high"
              className="w-24 h-24 mx-auto"
            />
          </div>
        </div>
        <h2 className="text-center text-xl font-semibold text-gray-900">
          Sign in to your account
        </h2>
        <div className="bg-white p-4 rounded-lg">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 mt-1 block w-full border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-sm py-1.5"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 mt-1 block w-full border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 text-sm py-1.5"
              />
            </div>
            {localError && <div className="text-red-600 text-sm">{localError}</div>}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || authLoading}
                className="w-full py-1.5 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 text-sm"
              >
                {isSubmitting || authLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
          <div className="text-center mt-2">
            <p className="text-xs text-gray-600">Don't have an account?</p>
            <Link to="/signup" className="text-xs text-purple-600 hover:text-purple-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
