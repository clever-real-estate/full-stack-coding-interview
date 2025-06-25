export type Photo = {
  id: string;
  isFavorite: boolean;
  imageUrl: string;
  photographer: string;
  title: string;
  hexColor: string;
  portfolioUrl: string;
};

export type PhotoResponse = {
  id: string;
  is_favorite: boolean;
  image_url: string;
  photographer: string;
  alt: string;
  avg_color: string;
  photographer_url: string;
}