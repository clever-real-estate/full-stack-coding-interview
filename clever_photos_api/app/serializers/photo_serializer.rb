class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :url, :width, :height, :likes_count, :alt, :liked

  attribute :image_urls do
    {
      original: object.src_original,
      large2x: object.src_large2x,
      large: object.src_large,
      medium: object.src_medium,
      small: object.src_small,
      portrait: object.src_portrait,
      landscape: object.src_landscape,
      tiny: object.src_tiny
    }
  end

  attribute :avg_color

  belongs_to :photographer, serializer: PhotographerSerializer

  def liked
    object.likes.exists?(user: scope)
  end
end
