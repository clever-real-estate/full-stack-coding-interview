module UrlValidator
  extend ActiveSupport::Concern

  included do
    validates :url, presence: true, uniqueness: true

    validate :url_format
  end

  private

  def url_format
    return if url.blank?

    unless url.match?(/\Ahttps?:\/\/[\S]+\z/)
      errors.add(:url, "must be a valid URL")
    end

    attributes.keys.select { |attr| attr.start_with?("src_") }.each do |src_field|
      next if self[src_field].blank?

      unless self[src_field].match?(/\Ahttps?:\/\/[\S]+\z/)
        errors.add(src_field, "must be a valid URL")
      end
    end
  end
end
