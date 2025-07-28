import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import apiClient from '@/api/apiClient';
import Logo from '@/assets/logo.svg';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setIsLoading(true);
    try {
      const data = {
        email,
        password,
      }
      console.log('Sending POST to /api/users/signin/', { email });
      await apiClient.post('/api/users/signin/', data);
      console.log('Signin successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Signin error:', err.response?.data || err.message);
      if (err.response && err.response.data) {
        const apiErrors = err.response.data;
        const errorMessage = Object.values(apiErrors).flat().join(' ');
        setError(errorMessage || 'An unknown error occurred.');
      } else {
        setError('Failed to connect to the server. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex justify-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-1.5 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 text-sm"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
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
