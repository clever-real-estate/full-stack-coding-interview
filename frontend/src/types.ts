export interface User {
  user_id: string;
  username: string;
}

export interface Photographer {
  id?: number;
  name: string;
  url: string;
}

export interface Photo {
  id?: number;
  image_url: string;
  color: string;
  alt_text: string;
  photographer: Photographer;
  is_liked: boolean;
  like_count: number;
}

