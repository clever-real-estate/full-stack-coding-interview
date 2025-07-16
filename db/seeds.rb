# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# TODO: remove this after testing
[
  { email_address: "test@test.com", password: "1234" },
  { email_address: "test2@test.com", password: "1234" }
].each do |attrs|
  user = User.find_or_initialize_by(email_address: attrs[:email_address])
  user.password = attrs[:password]
  user.save!
end


require "csv"

csv_file = Rails.root.join("photos.csv")

unless File.exist?(csv_file)
  puts "Error: photos.csv not found in #{Rails.root}"
  exit 1
end

puts "Seeding photos from photos.csv..."

CSV.foreach(csv_file, headers: true) do |row|
  photo = Photo.find_or_initialize_by(pexels_id: row["id"])
  photo.assign_attributes(
    width: row["width"],
    height: row["height"],
    url: row["url"],
    photographer: row["photographer"],
    photographer_url: row["photographer_url"],
    photographer_id: row["photographer_id"],
    avg_color: row["avg_color"],
    src_original: row["src.original"],
    src_large2x: row["src.large2x"],
    src_large: row["src.large"],
    src_medium: row["src.medium"],
    src_small: row["src.small"],
    src_portrait: row["src.portrait"],
    src_landscape: row["src.landscape"],
    src_tiny: row["src.tiny"],
    alt: row["alt"],
  )
  if photo.save
    print "."
  else
    puts "\nError saving photo #{row['id']}: #{photo.errors.full_messages.join(', ')}"
  end
end

puts "\nPhotos seeding completed!"
puts "Total photos: #{Photo.count}"
