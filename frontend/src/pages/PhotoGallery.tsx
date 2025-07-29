import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

import PhotoItem from '@/components/PhotoItem';
import apiClient from '@/api/apiClient';
import logo from '@/assets/logo.svg';

import type { Photo } from '@/types';

const PhotoGallery = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isFetchingPhotos, setIsFetchingPhotos] = useState(true);
  const [isInViewport, setIsInViewport] = useState<{ [key: number]: boolean }>({});
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const placeholder = useMemo(
    () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    []
  );

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }

    apiClient.get<Photo[]>('/photos/')
      .then((res) => {
        const data = res.data.map(photo => ({
          ...photo,
          id: photo.id ?? 0,
          is_liked: photo.is_liked ?? false,
          like_count: photo.like_count ?? 0,
        }));
        setPhotos(data);
        photoRefs.current = Array(data.length).fill(null);
      })
      .catch((error) => {
        console.error('Failed to fetch photos:', error);
        if (error.response?.status === 401) {
          logout();
          navigate('/signin');
        }
      })
      .finally(() => {
        setIsFetchingPhotos(false);
      });
  }, [user, navigate, logout, photos.length]);

  const handleLikeToggle = useCallback(async (photoId?: number) => {
    setPhotos((currentPhotos) =>
      currentPhotos.map((p) =>
        p.id === photoId 
          ? { 
              ...p, 
              is_liked: !p.is_liked, 
              like_count: p.is_liked ? p.like_count - 1 : p.like_count + 1 
            } 
          : p
      )
    );

    try {
      await apiClient.post(`/photos/${photoId}/like/`);
    } catch (error) {
      console.error('Failed to update like status:', error);
      setPhotos((currentPhotos) =>
        currentPhotos.map((p) =>
          p.id === photoId 
            ? { 
                ...p, 
                is_liked: !p.is_liked, 
                like_count: p.is_liked ? p.like_count - 1 : p.like_count + 1 
              } 
            : p
        )
      );
    }
  }, []);

  useEffect(() => {
    if (photos.length === 0) return;
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const updates: { [key: number]: boolean } = {};
        entries.forEach((entry) => {
          const index = photoRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            updates[index] = entry.isIntersecting;
          }
        });
        
        if (Object.keys(updates).length > 0) {
          setIsInViewport((prev) => ({ ...prev, ...updates }));
        }
      },
      { 
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    photoRefs.current.forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [photos]);

  const { prioritizedPhotos, remainingPhotos } = useMemo(() => ({
    prioritizedPhotos: photos.slice(0, 4),
    remainingPhotos: photos.slice(4)
  }), [photos]);

  const isLoading = isFetchingPhotos;

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8">

      <header className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl py-8 mx-auto">
          <div className="flex items-center justify-between h-16" style={{ minHeight: 'min-content' }}>
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-20 w-auto" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            All photos
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full sm:max-w-3xl mx-auto">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : photos.length > 0 ? (
          <main className="max-w-5xl mx-auto p-2">
            <div>
              {photos.map((photo, index) => (
                <PhotoItem
                  key={photo.id}
                  ref={el => photoRefs.current[index] = el}
                  photo={photo}
                  onToggleLike={handleLikeToggle}
                  index={index}
                  isInView={!!isInViewport[index]}
                  placeholder={placeholder}
                />
              ))}
            </div>
          </main>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
            <p className="text-gray-600">Check back later for new content.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotoGallery;
