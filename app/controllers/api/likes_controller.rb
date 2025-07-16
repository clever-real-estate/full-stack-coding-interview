class Api::LikesController < Api::BaseController
  before_action :set_photo

  def create
    like = Current.user.likes.build(photo: @photo)

    if like.save
      render json: {
        success: true,
        likes_count: @photo.reload.likes_count,
        liked_by_current_user: true
      }
    else
      render json: {
        success: false,
        error: like.errors.full_messages.join(", ")
      }, status: :unprocessable_entity
    end
  end

  def destroy
    like = Current.user.likes.find_by(photo: @photo)

    if like&.destroy
      render json: {
        success: true,
        likes_count: @photo.reload.likes_count,
        liked_by_current_user: false
      }
    else
      render json: {
        success: false,
        error: "Like not found"
      }, status: :not_found
    end
  end

  def liked
    render json: {
      liked: Current.user&.likes&.exists?(photo: @photo)
    }
  end

  def count
    render json: {
      count: @photo.likes_count
    }
  end

  private

  def set_photo
    @photo = Photo.find(params[:photo_id])
  rescue ActiveRecord::RecordNotFound
    render json: { success: false, error: "Photo not found" }, status: :not_found
  end
end
