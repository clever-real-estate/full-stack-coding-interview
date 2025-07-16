# == Schema Information
#
# Table name: photos
#
#  id               :integer          not null, primary key
#  alt              :text
#  avg_color        :string
#  height           :integer
#  likes_count      :integer          default(0), not null
#  photographer     :string
#  photographer_url :string
#  src_landscape    :string
#  src_large        :string
#  src_large2x      :string
#  src_medium       :string
#  src_original     :string
#  src_portrait     :string
#  src_small        :string
#  src_tiny         :string
#  url              :string
#  width            :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  pexels_id        :integer
#  photographer_id  :integer
#
class Photo < ApplicationRecord
  has_many :likes, dependent: :destroy
  has_many :users, through: :likes

  validates :pexels_id, presence: true, uniqueness: true
  validates :photographer, presence: true
  validates :url, presence: true

  scope :ordered_by_date, -> { order(created_at: :desc) }
end
