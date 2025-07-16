class Api::PhotosController < Api::BaseController
  def index
    photos = Photo.ordered_by_date.limit(10)
    render json: photos.map { |photo| photo_json(photo) }
  end

  private

  def photo_json(photo)
    {
      id: photo.id,
      pexels_id: photo.pexels_id,
      width: photo.width,
      height: photo.height,
      url: photo.url,
      photographer: photo.photographer,
      photographer_url: photo.photographer_url,
      photographer_id: photo.photographer_id,
      avg_color: photo.avg_color,
      src_original: photo.src_original,
      src_large2x: photo.src_large2x,
      src_large: photo.src_large,
      src_medium: photo.src_medium,
      src_small: photo.src_small,
      src_portrait: photo.src_portrait,
      src_landscape: photo.src_landscape,
      src_tiny: photo.src_tiny,
      alt: photo.alt,
      likes_count: photo.likes_count,
      liked_by_current_user: Current.user&.likes&.exists?(photo: photo)
    }
  end
end
