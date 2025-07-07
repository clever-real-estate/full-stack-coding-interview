class Like < ApplicationRecord
  belongs_to :user
  belongs_to :photo, counter_cache: :likes_count

  validates :user, presence: true
  validates :photo, presence: true

  validates :user_id, uniqueness: { scope: :photo_id }
end
