require 'csv'

puts "Clearing existing data..."
Like.destroy_all
Photo.destroy_all
Photographer.destroy_all
User.destroy_all

puts "Creating test users..."
users = [
  {
    email: 'test@test.com',
    password: 'password'
  },
  {
    email: 'test2@test.com',
    password: 'password'
  }
].map { |attrs| User.create!(attrs) }

csv_file_path = Rails.root.join('test', 'fixtures', 'files', 'photos_data.csv')

puts "Importing photos from #{csv_file_path}..."
photos_count = 0
photographers_count = 0

CSV.foreach(csv_file_path, headers: true) do |row|
  photographer = Photographer.find_or_create_by(url: row['photographer_url']) do |p|
    p.name = row['photographer']
    photographers_count += 1
  end

  Photo.create!(
    width: row['width'].to_i,
    height: row['height'].to_i,
    url: row['url'],
    avg_color: row['avg_color'],
    src_original: row['src.original'],
    src_large2x: row['src.large2x'],
    src_large: row['src.large'],
    src_medium: row['src.medium'],
    src_small: row['src.small'],
    src_portrait: row['src.portrait'],
    src_landscape: row['src.landscape'],
    src_tiny: row['src.tiny'],
    alt: row['alt'],
    photographer: photographer
  )
  photos_count += 1

  print '.' if (photos_count % 10).zero?
end

puts "\nSeeding complete!"
puts "Created:"
puts "- #{users.count} users"
puts "- #{photographers_count} photographers"
puts "- #{photos_count} photos"
