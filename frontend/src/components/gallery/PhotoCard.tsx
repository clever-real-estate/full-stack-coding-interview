'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, User, ExternalLink } from 'lucide-react';
import { Photo } from '@/types/photo';

interface PhotoCardProps {
  photo: Photo;
  onLike: (photoId: string) => void;
  loading?: boolean;
}

export default function PhotoCard({ photo, onLike, loading = false }: PhotoCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!loading) {
      onLike(photo.id);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const formatLikeCount = (count: number): string => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}k`;
    return `${(count / 1000000).toFixed(1)}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image container */}
      <div className="relative aspect-[4/3] bg-gray-100">
        {/* Loading skeleton */}
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        {/* Error state */}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                <ExternalLink className="w-8 h-8" />
              </div>
              <p className="text-sm">Image unavailable</p>
            </div>
          </div>
        ) : (
          <Image
            src={photo.src_medium || photo.src_small || photo.src_original}
            alt={photo.alt_text || `Photo by ${photo.photographer}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* Like button overlay */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={handleLikeClick}
            disabled={loading}
            className={`p-2 rounded-full transition-all duration-200 ${
              photo.user_liked
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
            } ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            } shadow-md backdrop-blur-sm`}
            aria-label={photo.user_liked ? 'Unlike photo' : 'Like photo'}
          >
            <Heart
              className={`w-5 h-5 ${
                photo.user_liked ? 'fill-current' : ''
              } ${loading ? 'animate-pulse' : ''}`}
            />
          </button>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Photographer info */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              {photo.photographer_url ? (
                <a
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors truncate block"
                >
                  {photo.photographer}
                </a>
              ) : (
                <span className="text-sm font-medium text-gray-900 truncate block">
                  {photo.photographer}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Alt text / description */}
        {photo.alt_text && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {photo.alt_text}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{formatLikeCount(photo.like_count)}</span>
            </span>
            <span>{photo.width} × {photo.height}</span>
          </div>

          {/* View on Pexels link */}
          <a
            href={photo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>View</span>
          </a>
        </div>
      </div>
    </div>
  );
}