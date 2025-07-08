'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

interface SignInFormProps {
  onSuccess?: () => void;
}

export default function SignInForm({ onSuccess }: SignInFormProps) {
  const router = useRouter();
  const { login, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      clearError();
      await login(formData.email, formData.password);
      
      // Success callback or redirect
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(ROUTES.GALLERY);
      }
    } catch (error) {
      // Error is handled by the auth context
      console.error('Sign in failed:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="w-[320px]">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Global error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Username field */}
        <div className="space-y-1">
          <label 
            htmlFor="email" 
            className="block text-[14px] font-bold text-[#111827]"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
          >
            Username
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full h-[44px] px-3 py-3 text-[16px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#0075EB] focus:ring-1 focus:ring-[#0075EB]"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            placeholder="testing@testing.com"
            disabled={loading}
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        {/* Password field */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label 
              htmlFor="password" 
              className="text-[14px] font-bold text-[#111827]"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              Password
            </label>
            <button
              type="button"
              className="text-[14px] text-[#0075EB] hover:underline"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
              onClick={() => {/* TODO: Implement forgot password */}}
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleInputChange}
            className="w-full h-[44px] px-3 py-3 text-[16px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#0075EB] focus:ring-1 focus:ring-[#0075EB]"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            placeholder="●●●●●●●"
            disabled={loading}
          />
          {formErrors.password && (
            <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-[44px] bg-[#0075EB] text-white text-[16px] font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#0075EB] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}