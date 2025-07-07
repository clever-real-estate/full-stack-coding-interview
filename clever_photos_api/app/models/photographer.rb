class Photographer < ApplicationRecord
  include UrlValidator

  has_many :photos, dependent: :destroy

  validates :name, presence: true
end
