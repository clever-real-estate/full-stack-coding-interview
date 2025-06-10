// src/components/PhotoCard.tsx
import React from 'react';
import { ReactComponent as LinkSVG } from '../assets/links.svg';
import { Photo } from '../types';
import styles from './PhotoCard.module.css';
import { ReactComponent as StarLine } from '../assets/star-line.svg';
import { ReactComponent as StarFill } from '../assets/star-fill.svg';

interface Props {
  photo: Photo;
  onLike: (id: number) => void;
  isLiked: boolean;
}

/**
 * PhotoCard displays a photo with metadata and like functionality.
 * @param photo - The photo object to display.
 * @param onLike - Callback when the photo is liked/unliked.
 * @param isLiked - Indicates if the photo is currently liked by the user.
 */
const PhotoCard: React.FC<Props> = ({ photo, onLike, isLiked }) => {
  return (
    <div className={styles.card}>
      {/* Like button: toggles liked state */}
      <button
        className={styles.starBtn}
        onClick={() => onLike(photo.id)}
        aria-label={isLiked ? 'Un-like' : 'Like'}
      >
        {isLiked
          ? <StarFill className={styles.starIcon} />
          : <StarLine className={styles.starIcon} />
        }
      </button>

      {/* Display the photo */}
      <img
        className={styles.image}
        src={photo.medium_src}
        alt={photo.alt || photo.photographer}
      />

      {/* Display photo metadata */}
      <div className={styles.info}>
        <div className={styles.photographer}>{photo.photographer}</div>
        <div className={styles.caption}>{photo.alt}</div>
        <div className={styles.meta}>
          {/* Use avg_color to style text and color block */}
          <span className={styles.id} style={{ color: photo.avg_color }}>
            #{photo.photo_id}
          </span>
          <span
            className={styles.color}
            style={{ backgroundColor: photo.avg_color }}
          />
        </div>
      </div>

      {/* Photographer's external portfolio link */}
      <a
        href={photo.portfolio}
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <LinkSVG className={styles.linkIcon} />
        Portfolio
      </a>
    </div>
  );
};

export default PhotoCard;
