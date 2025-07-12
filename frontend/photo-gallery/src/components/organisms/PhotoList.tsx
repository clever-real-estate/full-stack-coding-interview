import React, { useState, useEffect } from 'react';
import { Photo } from '../../utils/photoService';
import { photoService } from '../../utils/photoService';
import PhotoCard from '../molecules/PhotoCard';
import styles from '../../styles/PhotoList.module.css';

const PhotoList: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const data = await photoService.getPhotos();
      setPhotos(data);
    } catch (err: any) {
      setError('Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async (photoId: number, isLiked: boolean) => {
    try {
      if (isLiked) {
        await photoService.unlikePhoto(photoId);
      } else {
        await photoService.likePhoto(photoId);
      }
      setPhotos(prevPhotos =>
        prevPhotos.map(photo =>
          photo.id === photoId
            ? { ...photo, is_liked: !isLiked }
            : photo
        )
      );
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading photos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.photoList}>
        {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onLikeToggle={handleLikeToggle}
        />
        ))}
    </div>
  );
};

export default PhotoList; 