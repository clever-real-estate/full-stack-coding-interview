import React from 'react';

interface StarIconProps {
  filled?: boolean;
  size?: number;
}

const StarIcon: React.FC<StarIconProps> = ({ filled = false, size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? '#FFD600' : 'none'}
    stroke={filled ? '#FFD600' : '#B0B0B0'}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block' }}
    aria-hidden="true"
    focusable="false"
    data-testid="star-icon"
    data-filled={filled}
    data-size={size}
  >
    <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
  </svg>
);

export default React.memo(StarIcon);
