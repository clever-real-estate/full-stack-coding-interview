import { memo } from 'react';
import starFill from '@/assets/star-fill.svg';
import starLine from '@/assets/star-line.svg';
import links from '@/assets/links.svg';

interface ColorSquareProps {
  hexColor: string;
}

interface PortfolioLinkProps {
  portfolioUrl: string;
}

interface StarProps {
  isLiked: boolean;
  onToggleLike: () => void;
  ariaLabel: string;
}

const ColorSquare = memo(({ hexColor }: ColorSquareProps) => (
  <div
    style={{ backgroundColor: hexColor }}
    className="w-6 h-6 rounded border border-gray-300"
    aria-label={`Color swatch ${hexColor}`}
  />
));

const PortfolioLink = ({
  portfolioUrl,
}: PortfolioLinkProps) => (
  <a
    href={portfolioUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-500 text-sm font-medium"
    title="Open portfolio"
  >
    <img src={links} alt="Open portfolio icon" className="w-4 h-4" />
    <span>Portfolio</span>
  </a>
);

const Star = memo(({
  isLiked,
  onToggleLike,
  ariaLabel,
}: StarProps) => (
  <button
    onClick={onToggleLike}
    aria-label={ariaLabel}
    aria-pressed={isLiked}
  >
    <img src={isLiked ? starFill : starLine} alt="Star for Likes icon" className="focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded w-4 h-4 lg:w-6 lg:h-6" />
  </button>
));

export {
  ColorSquare,
  PortfolioLink,
  Star,
};

