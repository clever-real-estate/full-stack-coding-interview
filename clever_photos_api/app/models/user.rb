class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :photos, dependent: :destroy, foreign_key: :photographer_id
  has_many :likes, dependent: :destroy
  has_many :liked_photos, through: :likes, source: :photo

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }, if: :password_required?


  private

  def password_required?
    new_record? || password.present?
  end
end
