puts "Cleaning database..."

Photo.destroy_all
Like.destroy_all
User.destroy_all

puts "Creating users..."
user1 = User.create!(name: 'Test User', email: 'test@example.com', password: 'password', password_confirmation: 'password')
puts "Created user: #{user1.email}"

puts "Creating photos for #{user1.name}..."

# This array contains the data provided on the project CSV
photo_data = [
  { pexels_id: 21751820, width: 3888, height: 5184, photographer: "Felix", photographer_url: "https://www.pexels.com/@felix-57767809", avg_color: "#333831", image_url: "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "A small island surrounded by trees in the middle of a lake" },
  { pexels_id: 21405575, width: 5284, height: 3514, photographer: "Centre for Ageing Better", photographer_url: "https://www.pexels.com/@centre-for-ageing-better-55954677", avg_color: "#6D755E", image_url: "https://images.pexels.com/photos/21405575/pexels-photo-21405575.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "Two older people cycling" },
  { pexels_id: 21294736, width: 3456, height: 4608, photographer: "Victor de Dompablo", photographer_url: "https://www.pexels.com/@vkiller", avg_color: "#757472", image_url: "https://images.pexels.com/photos/21294736/pexels-photo-21294736.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "Black and white photo of people walking on the beach" },
  { pexels_id: 21617723, width: 6000, height: 4000, photographer: "Amim kashmiri", photographer_url: "https://www.pexels.com/@amim-kashmiri-1172536446", avg_color: "#434343", image_url: "https://images.pexels.com/photos/21617723/pexels-photo-21617723.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "arg karim khan zand" },
  { pexels_id: 21328017, width: 5207, height: 7800, photographer: "Kinga Runo", photographer_url: "https://www.pexels.com/@kinga-runo-1157203540", avg_color: "#636363", image_url: "https://images.pexels.com/photos/21328017/pexels-photo-21328017.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "Couple photography, Kinga Runo, Bath, Bristol" },
  { pexels_id: 21315872, width: 4160, height: 6240, photographer: "Matteo Roman", photographer_url: "https://www.pexels.com/@matteo-roman-1151921619", avg_color: "#91A197", image_url: "https://images.pexels.com/photos/21315872/pexels-photo-21315872.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "A glimpse of London" },
  { pexels_id: 21294950, width: 5184, height: 3456, photographer: "Badr Samih", photographer_url: "https://www.pexels.com/@badr-samih-1061561024", avg_color: "#7C401B", image_url: "https://images.pexels.com/photos/21294950/pexels-photo-21294950.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "End of the day with the horses of Casablanca" },
  { pexels_id: 21274611, width: 2862, height: 4296, photographer: "Marcelo Gonzalez", photographer_url: "https://www.pexels.com/@marcelo-gonzalez-1141370437", avg_color: "#798792", image_url: "https://images.pexels.com/photos/21274611/pexels-photo-21274611.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "Profundidad" },
  { pexels_id: 21705409, width: 2920, height: 3965, photographer: "Guzel'S", photographer_url: "https://www.pexels.com/@guzel-s-3331480", avg_color: "#8F806B", image_url: "https://images.pexels.com/photos/21705409/pexels-photo-21705409.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "Free stock photo of awakening, background, blooming" },
  { pexels_id: 21077134, width: 2551, height: 4536, photographer: "Lukas Faust", photographer_url: "https://www.pexels.com/@lukasfst", avg_color: "#8C968E", image_url: "https://images.pexels.com/photos/21077134/pexels-photo-21077134.jpeg?auto=compress&cs=tinysrgb&h=350", alt_text: "Canggu Surfer" }
]

photo_data.each do |data|
  photo_attributes = data.merge(user: user1)
  Photo.create!(photo_attributes)
end

puts "Finished seeding! Created #{Photo.count} photos"
