class PhotosService
  attr_reader :current_user

  def initialize(current_user)
    @current_user = current_user
  end

  def all_photos
    Photo.all.includes(:photographer)
  end

  def like_photo(photo_id)
    photo = Photo.find(photo_id)

    photo.likes.find_or_create_by(user: current_user)

    photo.reload
  end

  def unlike_photo(photo_id)
    photo = Photo.find(photo_id)

    photo.likes.find_by(user: current_user)&.destroy

    photo.reload
  end
end
