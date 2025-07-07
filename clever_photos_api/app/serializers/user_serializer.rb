class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_many :liked_photos, serializer: PhotoSerializer
end
