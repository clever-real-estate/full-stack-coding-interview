export interface User {
  id: number;
  email: string;
}

export interface Photo {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  likes: number;
  hasLiked: boolean;
  photographer: string;
  photographer_url: string;
  color: string;
  alt: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthError {
  message: string;
} 