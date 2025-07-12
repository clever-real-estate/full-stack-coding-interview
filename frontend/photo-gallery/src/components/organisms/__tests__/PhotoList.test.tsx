import React from 'react';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import PhotoList from '../PhotoList';

jest.mock('../../molecules/PhotoCard', () => {
  return function MockPhotoCard({ photo, onLikeToggle }: any) {
    return (
      <div data-testid={`photo-card-${photo.id}`}>
        <span>{photo.photographer}</span>
        <button onClick={() => onLikeToggle(photo.id, photo.is_liked)}>
          {photo.is_liked ? 'Unlike' : 'Like'}
        </button>
      </div>
    );
  };
});

jest.mock('../../../utils/photoService', () => ({
  photoService: {
    getPhotos: jest.fn(),
    likePhoto: jest.fn(),
    unlikePhoto: jest.fn(),
  },
}));

describe('PhotoList', () => {
  const mockPhotos = [
    { id: 1, url: 'url1', photographer: 'Alice', is_liked: false },
    { id: 2, url: 'url2', photographer: 'Bob', is_liked: true },
  ];
  const { photoService } = require('../../../utils/photoService');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    photoService.getPhotos.mockReturnValue(new Promise(() => {}));
    await act(async () => {
      render(<PhotoList />);
    });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders photos when data is loaded successfully', async () => {
    photoService.getPhotos.mockResolvedValue(mockPhotos);
    await act(async () => {
      render(<PhotoList />);
    });
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('renders error message when photos fail to load', async () => {
    photoService.getPhotos.mockRejectedValue(new Error('Failed to load'));
    await act(async () => {
      render(<PhotoList />);
    });
    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });

  it('calls photoService.getPhotos on mount', async () => {
    photoService.getPhotos.mockResolvedValue(mockPhotos);
    await act(async () => {
      render(<PhotoList />);
    });
    await waitFor(() => {
      expect(photoService.getPhotos).toHaveBeenCalled();
    });
  });

  it('handles like toggle correctly', async () => {
    photoService.getPhotos.mockResolvedValue(mockPhotos);
    photoService.likePhoto.mockResolvedValue({});
    photoService.unlikePhoto.mockResolvedValue({});
    await act(async () => {
      render(<PhotoList />);
    });
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });
    const likeButton = screen.getAllByRole('button')[0];
    await act(async () => {
      fireEvent.click(likeButton);
    });
    await waitFor(() => {
      expect(photoService.likePhoto).toHaveBeenCalledWith(1);
    });
  });

  it('renders correct number of photo cards', async () => {
    photoService.getPhotos.mockResolvedValue(mockPhotos);
    await act(async () => {
      render(<PhotoList />);
    });
    await waitFor(() => {
      expect(screen.getAllByTestId(/photo-card-/)).toHaveLength(2);
    });
  });
}); 