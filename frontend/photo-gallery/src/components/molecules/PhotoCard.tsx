import React from 'react';
import { Photo } from '../../utils/photoService';
import StarIcon from '../atoms/StarIcon';
import styles from '../../styles/PhotoCard.module.css';

interface PhotoCardProps {
  photo: Photo;
  onLikeToggle: (photoId: number, isLiked: boolean) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onLikeToggle }) => {
  const handleLikeClick = () => {
    onLikeToggle(photo.id, photo.is_liked);
  };

  return (
    <div className={styles.photoCard}>
      <button
        className={styles.likeButton}
        onClick={handleLikeClick}
        aria-label={photo.is_liked ? 'Unlike photo' : 'Like photo'}
      >
        <StarIcon filled={photo.is_liked} />
      </button>
      <img src={photo.src_medium} alt={photo.alt} className={styles.photoImage} />
      <div className={styles.photoInfo}>
        <div className={styles.photographerName}>{photo.photographer}</div>
        <div className={styles.photoAlt}>{photo.alt}</div>
        <div className={styles.colorInfo}>
          <span className={styles.colorCode}>{photo.avg_color}</span>
          <span
            className={styles.colorSwatch}
            style={{ background: photo.avg_color }}
            data-testid="color-swatch"
          />
        </div>
      </div>
      <a
        href={photo.photographer_url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.portfolioLink}
      >
        <svg
          className={styles.linkIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1976d2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 1 7 7l-1.5 1.5a5 5 0 0 1-7-7" />
          <path d="M14 11a5 5 0 0 0-7-7L5.5 5.5a5 5 0 0 0 7 7" />
        </svg>
        Portfolio
      </a>
    </div>
  );
};

export default PhotoCard; 