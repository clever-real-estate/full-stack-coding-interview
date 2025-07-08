'use client';

import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function Loading({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className={`mt-2 text-gray-600 ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Full screen loading component
export function FullScreenLoading({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading size="lg" text={text} />
    </div>
  );
}

// Inline loading component
export function InlineLoading({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loading size="md" text={text} />
    </div>
  );
}