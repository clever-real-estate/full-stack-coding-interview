class Photo < ApplicationRecord
  include UrlValidator

  belongs_to :photographer

  has_many :likes

  validates :width, presence: true
  validates :height, presence: true


  validates :avg_color, presence: true
  validates :src_original, presence: true

  validates :alt, presence: true
  validates :photographer, presence: true
end
