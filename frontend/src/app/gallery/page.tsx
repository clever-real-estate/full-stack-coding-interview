'use client';

import React, { useState } from 'react';
import { usePhotos } from '@/hooks/usePhotos';
import AuthGuard from '@/components/auth/AuthGuard';
import { InlineLoading } from '@/components/shared/Loading';

export default function GalleryPage() {
  const {
    photos,
    loading,
    error,
    likePhoto,
  } = usePhotos(1);

  const [isLiking, setIsLiking] = useState<string | null>(null);

  const handleLikePhoto = async (photoId: string) => {
    try {
      setIsLiking(photoId);
      await likePhoto(photoId);
    } catch (error) {
      console.error('Failed to like photo:', error);
    } finally {
      setIsLiking(null);
    }
  };

  return (
    <AuthGuard>
      <div 
        style={{
          position: 'relative',
          width: '1280px',
          height: '832px',
          background: '#FFFFFF',
          margin: '0 auto',
          overflow: 'hidden'
        }}
      >
        {/* Logo */}
        <div 
          style={{
            position: 'absolute',
            width: '75px',
            height: '75px',
            left: '390px',
            top: '24px'
          }}
        >
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
            position: 'absolute',
            width: '98px',
            height: '23px',
            left: '390px',
            top: '123px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '20px',
            lineHeight: '23px',
            color: '#111827',
            margin: 0
          }}
        >
          All photos
        </h1>

        {/* Error message */}
        {error && (
          <div 
            style={{
              position: 'absolute',
              left: '390px',
              top: '160px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div 
            style={{
              position: 'absolute',
              left: '390px',
              top: '200px',
              fontSize: '14px',
              color: '#6B7280'
            }}
          >
            <InlineLoading text="Loading photos..." />
          </div>
        )}

        {/* Empty state */}
        {!loading && photos.length === 0 && !error && (
          <div 
            style={{
              position: 'absolute',
              left: '390px',
              top: '200px',
              fontSize: '14px',
              color: '#6B7280'
            }}
          >
            No photos available
          </div>
        )}

        {/* Photo List */}
        {photos.map((photo, index) => (
          <div 
            key={photo.id}
            style={{
              position: 'absolute',
              width: '500px',
              height: '75px',
              left: '390px',
              top: `${186 + (index * 87)}px`
            }}
          >
            {/* Like Icon */}
            <button
              onClick={() => handleLikePhoto(photo.id)}
              disabled={isLiking === photo.id}
              style={{
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '20px',
                height: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0'
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                style={{
                  fill: photo.user_liked ? '#FFD600' : 'none',
                  stroke: photo.user_liked ? '#FFD600' : '#9CA3AF',
                  strokeWidth: '2'
                }}
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            </button>

            {/* Photo Thumbnail */}
            <div 
              style={{
                position: 'absolute',
                width: '75px',
                height: '75px',
                left: '31px',
                top: '0px',
                background: '#D9D9D9',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <img 
                src={photo.src_medium || photo.src_small || photo.src_large || photo.src_original}
                alt={photo.alt_text || 'Photo'}
                style={{
                  width: '75px',
                  height: '75px',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* Photo Info */}
            <div>
              {/* Photographer Name */}
              <div 
                style={{
                  position: 'absolute',
                  left: '118px',
                  top: '0px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#111827'
                }}
              >
                {photo.photographer}
              </div>

              {/* Photo Alt Text */}
              <div 
                style={{
                  position: 'absolute',
                  left: '118px',
                  top: '22px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#111827'
                }}
              >
                {photo.alt_text || 'Photo'}
              </div>

              {/* Color Code */}
              <div 
                style={{
                  position: 'absolute',
                  left: '118px',
                  top: '44px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: photo.avg_color || '#374824'
                }}
              >
                {photo.avg_color || '#374824'}
              </div>

              {/* Color Swatch */}
              <div 
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  left: '181px',
                  top: '46px',
                  background: photo.avg_color || '#374824'
                }}
              />
            </div>

            {/* Portfolio Link */}
            {photo.photographer_url && (
              <div 
                style={{
                  position: 'absolute',
                  width: '60px',
                  height: '14px',
                  left: '440px',
                  top: '1px'
                }}
              >
                <svg 
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    left: '0px',
                    top: '1px'
                  }}
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="#0075EB" 
                  strokeWidth="2"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <a
                  href={photo.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    width: '45px',
                    height: '14px',
                    left: '15px',
                    top: '0px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '12px',
                    lineHeight: '14px',
                    textAlign: 'right',
                    color: '#0075EB',
                    textDecoration: 'none'
                  }}
                >
                  Portfolio
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </AuthGuard>
  );
}