export type Image = {
  default: string;
  thumb: string;
  portrait: string;
  large: string;
  medium: string;
  landscape: string;
  small: string;
};

export type Photo = {
  id: number;
  photographer: string;
  photographer_url?: string;
  description?: string;
  image_url?: string;
  image: Image;
  liked: boolean;
  likes: number;
  color?: string;
};
