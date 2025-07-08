// Photo types
export interface Photo {
  id: string;
  pexels_id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src_original: string;
  src_large: string;
  src_medium: string;
  src_small: string;
  alt_text: string;
  like_count: number;
  user_liked: boolean;
  created_at: string;
  updated_at: string;
}

export interface PhotosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Photo[];
}

export interface LikeResponse {
  message: string;
  liked: boolean;
  like_count: number;
}

export interface PhotoCardProps {
  photo: Photo;
  onLike: (photoId: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}