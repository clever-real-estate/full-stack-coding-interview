import { forwardRef, useCallback } from 'react';
import type { Ref } from 'react';

import Photo from '@/components/Photo';
import { ColorSquare, PortfolioLink, Star } from '@/components/icons';

import { Photo as PhotoType } from '../types';

function getImageBaseUrl(imageUrl: string) {
  return imageUrl.split("?")[0];
}

function generateSrcSet(baseUrl: string, format: string, quality: number = 75) {
  const widths = [320, 640, 960, 1280, 1920];
  return widths
    .map(
      (width) =>
        `${baseUrl}?auto=format,compress&fm=${format}&q=${quality}&w=${width} ${width}w`
    )
    .join(", ");
}

function getOptimizedImageUrl(
  baseUrl: string,
  quality = 75,
  height = 96
) {
  return `${baseUrl}?auto=compress&cs=tinysrgb&q=${quality}&h=${height}&fit=crop`;
}

interface PhotoItemProps {
  photo: PhotoType;
  onToggleLike: (id?: number) => void;
  index: number;
  isInView: boolean;
  placeholder?: string;
}

const PhotoItem = forwardRef(({
  photo,
  onToggleLike,
  index,
  isInView = true,
  placeholder,
}: PhotoItemProps, ref: Ref<HTMLDivElement>) => {
  const handleLikeClick = useCallback(() => {
    onToggleLike(photo.id);
  }, [photo.id, onToggleLike]);

  const baseUrl = getImageBaseUrl(photo.image_url);

  const sizes = '(max-width: 768px) 100vw, 200px';

  return (
    <div ref={ref} className="flex items-center space-x-3 md:space-x-6 p-3 md:p-6">
      <Star
        isLiked={photo.is_liked}
        onToggleLike={handleLikeClick}
        ariaLabel={photo.is_liked ? 'Unlike photo' : 'Like photo'}
      />
      <Photo
        className="w-16 h-16 md:w-24 md:h-24 flex-shrink-0"
        altText={photo.alt_text}
        isInView={isInView}
        placeholder={placeholder}
        sources={[
          {
            type: 'image/avif',
            srcSet: generateSrcSet(baseUrl, 'avif', 75),
            sizes,
            src: getOptimizedImageUrl(baseUrl, 75, 96),
          },
          {
            type: 'image/webp',
            srcSet: generateSrcSet(baseUrl, 'webp', 75),
            sizes,
            src: getOptimizedImageUrl(baseUrl, 75, 96),
          },
        ]}
        fallbackSrc={getOptimizedImageUrl(baseUrl, 75, 96)}
        loading={index < 2 ? 'eager' : 'lazy'}
        fetchPriority={index < 2 ? 'high' : 'auto'}
        decoding="async"
      />
      <div className="flex-1 min-w-0 flex flex-col">
        <p className="font-medium text-sm md:text-base truncate">{photo.photographer.name}</p>
        <p className="text-xs md:text-sm text-gray-600 truncate">{photo.alt_text}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs font-mono">{photo.color}</span>
          <ColorSquare hexColor={photo.color} />
        </div>
      </div>
      <PortfolioLink portfolioUrl={photo.photographer.url} />
    </div>
  );
});

PhotoItem.displayName = "PhotoItem";
export default PhotoItem;
