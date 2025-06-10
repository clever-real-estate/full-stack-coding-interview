import React from 'react';

interface StarIconProps {
  filled?: boolean;
  size?: number;
}

const StarIcon: React.FC<StarIconProps> = ({ filled = false, size = 24 }) => {
  const src = filled
    ? require('../star-fill.svg').default
    : require('../star-line.svg').default;
  return <img src={src} alt={filled ? 'Star filled' : 'Star outline'} width={size} height={size} />;
};

export default StarIcon; 