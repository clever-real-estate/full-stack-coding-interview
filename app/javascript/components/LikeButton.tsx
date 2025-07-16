import React from 'react';
import StarFill from './StarFill';
import StarLine from './StarLine';

interface LikeButtonProps {
  liked: boolean;
  isPending: boolean;
  onClick: () => void;
  photoId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ liked, isPending, onClick, photoId }) => (
  <button
    className='flex-shrink-0 mr-4'
    disabled={isPending}
    onClick={onClick}
  >
    {/* @ts-ignore */}
    <click-spark></click-spark>
    {isPending ? (
      <span className="w-5 h-5 flex items-center justify-center">
        <svg className="animate-spin w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </span>
    ) : liked ? (
      <StarFill className='cursor-pointer w-5 h-5 ' />
    ) : (
      <StarLine className='cursor-pointer w-5 h-5 ' />
    )}
  </button>
);

export default LikeButton; 