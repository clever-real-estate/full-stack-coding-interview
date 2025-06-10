// src/routes/Photos.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPhotos, likePhoto, unlikePhoto } from '../../services/photoService';
import PhotoCard from '../../components/PhotoCard';
import { useAuth } from '../../hooks/useAuth';
import styles from './Photos.module.css';
import { Photo } from '../../types';
import { ReactComponent as Logo } from '../../assets/logo.svg';

/**
 * Photos component fetches and displays a list of photos with like/unlike functionality.
 * It handles authentication, loading state, and navigation on unauthorized access.
 */
const Photos: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Component state for photo data and loading indicator
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  // Retrieve the current logged-in user's name from local storage
  const currentUser = localStorage.getItem('userName')!;

  // Fetch photo data when component mounts
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotos();
        setPhotos(data);
      } catch (error: any) {
        // Redirect to signin if user is unauthorized
        if (error.response?.status === 401) {
          navigate('/signin');
        } else {
          console.error('Failed to fetch photos:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [navigate]);

  /**
   * Handles toggling the like status of a photo for the current user.
   * Updates local state to reflect the change after the API call.
   */
  const handleLike = async (id: number) => {
    const photo = photos.find(p => p.id === id);
    if (!photo) return;

    const isCurrentlyLiked = photo.liked_user.includes(currentUser);

    try {
      if (isCurrentlyLiked) {
        await unlikePhoto(id);
        setPhotos(prev =>
          prev.map(p =>
            p.id === id
              ? { ...p, liked_user: p.liked_user.filter(userName => userName !== currentUser) }
              : p
          )
        );
      } else {
        await likePhoto(id);
        setPhotos(prev =>
          prev.map(p =>
            p.id === id
              ? { ...p, liked_user: [...p.liked_user, currentUser] }
              : p
          )
        );
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  // Show loading indicator while fetching data
  if (loading) {
    return <div className={styles.loading}>Loading…</div>;
  }

  return (
    <div className={styles.container}>
      {/* Header with logo and logout button */}
      <header className={styles.header}>
        <Logo />
        <button className={styles.logout} onClick={logout}>
          Log out
        </button>
      </header>

      <h1 className={styles.title}>All photos</h1>

      {/* List of photo cards */}
      <div className={styles.list}>
        {photos.map(photo => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onLike={handleLike}
            isLiked={photo.liked_user.includes(currentUser)}
          />
        ))}
      </div>
    </div>
  );
};

export default Photos;
