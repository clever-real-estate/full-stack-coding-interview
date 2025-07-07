import type { Photographer } from "./photographer";

interface PhotoSource {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface Photo {
  id: number;
  alt: string;
  width: number;
  height: number;
  url: string;
  avg_color: string;
  image_urls: PhotoSource;
  photographer: Photographer;
  likes_count: number;
  liked: boolean;
}
