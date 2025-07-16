import React from 'react';
import { signOut } from './api';

const TopBar: React.FC = () => (
  <div className='flex justify-between items-center mb-4'>
    <img src="/logo.svg" alt="Logo" className="h-16 w-16" />
    <button
      className='text-sm text-blue-600 hover:underline cursor-pointer'
      onClick={signOut}
    >
      Sign out
    </button>
  </div>
);

export default TopBar; 