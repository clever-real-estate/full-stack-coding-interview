'use client';

import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-full bg-[#0075EB] rounded-full flex items-center justify-center">
        <span 
          className="text-white font-normal text-center leading-none"
          style={{ 
            fontFamily: 'Shrikhand, cursive',
            fontSize: '48%',
            fontStyle: 'italic'
          }}
        >
          CI
        </span>
      </div>
    </div>
  );
}