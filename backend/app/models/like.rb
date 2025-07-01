class Like < ApplicationRecord
  belongs_to :user
  belongs_to :photo

  validates :user_id, uniqueness: { scope: :photo_id }
end
