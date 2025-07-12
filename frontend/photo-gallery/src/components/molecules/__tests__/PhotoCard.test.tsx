import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PhotoCard from '../PhotoCard';

jest.mock('../../atoms/StarIcon', () => {
  return function MockStarIcon({ filled }: { filled: boolean }) {
    return <div data-testid="star-icon">{filled ? 'filled' : 'empty'}</div>;
  };
});

describe('PhotoCard', () => {
  const mockPhoto = {
    id: 1,
    width: 1920,
    height: 1080,
    url: 'https://example.com/photo',
    photographer: 'John Doe',
    photographer_url: 'https://example.com/john',
    photographer_id: 123,
    avg_color: '#FF5733',
    src_original: 'https://example.com/original.jpg',
    src_large2x: 'https://example.com/large2x.jpg',
    src_large: 'https://example.com/large.jpg',
    src_medium: 'https://example.com/medium.jpg',
    src_small: 'https://example.com/small.jpg',
    src_portrait: 'https://example.com/portrait.jpg',
    src_landscape: 'https://example.com/landscape.jpg',
    src_tiny: 'https://example.com/tiny.jpg',
    alt: 'Beautiful landscape',
    is_liked: false,
  };

  const mockOnLikeToggle = jest.fn();

  beforeEach(() => {
    mockOnLikeToggle.mockClear();
  });

  it('renders photo information correctly', () => {
    render(<PhotoCard photo={mockPhoto} onLikeToggle={mockOnLikeToggle} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Beautiful landscape')).toBeInTheDocument();
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });

  it('calls onLikeToggle when like button is clicked', () => {
    render(<PhotoCard photo={mockPhoto} onLikeToggle={mockOnLikeToggle} />);
    
    const likeButton = screen.getByRole('button');
    fireEvent.click(likeButton);
    
    expect(mockOnLikeToggle).toHaveBeenCalledWith(1, false);
  });

  it('shows filled star when photo is liked', () => {
    const likedPhoto = { ...mockPhoto, is_liked: true };
    render(<PhotoCard photo={likedPhoto} onLikeToggle={mockOnLikeToggle} />);
    
    expect(screen.getByText('filled')).toBeInTheDocument();
  });

  it('shows empty star when photo is not liked', () => {
    render(<PhotoCard photo={mockPhoto} onLikeToggle={mockOnLikeToggle} />);
    
    expect(screen.getByText('empty')).toBeInTheDocument();
  });
}); 