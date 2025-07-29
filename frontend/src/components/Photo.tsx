import { memo, useState, useEffect } from 'react';

interface PhotoSrc {
  src: string;
  type?: string;
  srcSet?: string;
  sizes?: string;
}

interface PhotoProps {
  altText: string;
  className?: string;
  sources: PhotoSrc[];
  fallbackSrc: string;
  placeholder?: string;
  isInView?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'low' | 'auto' | 'high';
  decoding?: 'async' | 'sync' | 'auto';
}

const Photo = ({
  altText,
  className = '',
  sources,
  fallbackSrc,
  placeholder,
  isInView = true,
  loading = 'lazy',
  fetchPriority = 'auto',
  decoding = 'async',
}: PhotoProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isInView) setIsLoaded(false);
  }, [isInView]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder or Blur Preview */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-105 transition duration-500"
          style={{ zIndex: 0 }}
        />
      )}
      {/* Conditionally render the real image only when in-view */}
      {isInView && (
        <picture className="w-full h-full">
          {sources.map((src, i) => (
            <source key={src.type || i} srcSet={src.srcSet || src.src} type={src.type} sizes={src.sizes} />
          ))}
          <img
            src={fallbackSrc}
            alt={altText}
            className={`w-full h-full object-cover rounded-lg transition duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding={decoding}
            onLoad={() => setIsLoaded(true)}
            style={{ zIndex: 1 }}
          />
        </picture>
      )}
    </div>
  );
};

export default memo(Photo);

