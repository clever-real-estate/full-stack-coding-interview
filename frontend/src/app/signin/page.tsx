'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import { FullScreenLoading } from '@/components/shared/Loading';

export default function SignInPage() {
  const router = useRouter();
  const { isAuthenticated, loading, login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push(ROUTES.GALLERY);
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <FullScreenLoading text="Checking authentication..." />;
  }

  if (isAuthenticated) {
    return <FullScreenLoading text="Redirecting..." />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push(ROUTES.GALLERY);
    } catch (err) {
      // Error handled by auth context
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Helvetica, Arial, sans-serif'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem'
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <img 
            src="/logo.svg" 
            alt="CI Logo" 
            style={{
              width: '75px',
              height: '75px'
            }}
          />
        </div>

        {/* Title */}
        <h1 
          style={{
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '3rem',
            fontFamily: 'Helvetica, Arial, sans-serif'
          }}
        >
          Sign in to your account
        </h1>

        {/* Error message */}
        {error && (
          <div 
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}
          >
            <p style={{ fontSize: '14px', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label 
              htmlFor="email" 
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem',
                fontFamily: 'Helvetica, Arial, sans-serif'
              }}
            >
              Username
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="testing@testing.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #9ca3af',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
              disabled={loading}
            />
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}
            >
              <label 
                htmlFor="password" 
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#111827',
                  fontFamily: 'Helvetica, Arial, sans-serif'
                }}
              >
                Password
              </label>
              <button
                type="button"
                style={{
                  fontSize: '14px',
                  color: '#0075EB',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Helvetica, Arial, sans-serif'
                }}
              >
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="●●●●●●●"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #9ca3af',
                borderRadius: '8px',
                fontSize: '16px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              required
              disabled={loading}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#0075EB',
              color: 'white',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Helvetica, Arial, sans-serif',
              opacity: loading ? 0.5 : 1,
              marginTop: '1rem'
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}