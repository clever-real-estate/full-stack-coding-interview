'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User, Camera } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';
import Logo from './Logo';

export default function Header() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push(ROUTES.SIGNIN);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <Logo className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Photo Gallery</h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Discover amazing photography
              </p>
            </div>
          </div>

          {/* User menu */}
          {user && (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {`${user.first_name} ${user.last_name}`.trim() || user.email}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={closeMenu}
                    aria-hidden="true"
                  />
                  
                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                    <div className="py-1">
                      {/* User info (mobile) */}
                      <div className="sm:hidden px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {`${user.first_name} ${user.last_name}`.trim() || user.email}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      {/* Menu items */}
                      <button
                        onClick={() => {
                          closeMenu();
                          router.push(ROUTES.GALLERY);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Camera className="w-4 h-4 mr-3" />
                        Gallery
                      </button>

                      <button
                        onClick={() => {
                          closeMenu();
                          handleLogout();
                        }}
                        disabled={loading}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        {loading ? 'Signing out...' : 'Sign Out'}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}