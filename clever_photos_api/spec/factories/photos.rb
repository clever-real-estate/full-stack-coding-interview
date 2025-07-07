FactoryBot.define do
  factory :photo do
    association :photographer

    width { Faker::Number.between(from: 800, to: 6000) }
    height { Faker::Number.between(from: 800, to: 6000) }
    url { Faker::Internet.url(host: 'pexels.com') }
    avg_color { Faker::Color.hex_color }
    alt { Faker::Lorem.sentence(word_count: 5) }

    src_original { Faker::Internet.url(host: 'images.pexels.com') }
    src_large2x { Faker::Internet.url(host: 'images.pexels.com') }
    src_large { Faker::Internet.url(host: 'images.pexels.com') }
    src_medium { Faker::Internet.url(host: 'images.pexels.com') }
    src_small { Faker::Internet.url(host: 'images.pexels.com') }
    src_portrait { Faker::Internet.url(host: 'images.pexels.com') }
    src_landscape { Faker::Internet.url(host: 'images.pexels.com') }
    src_tiny { Faker::Internet.url(host: 'images.pexels.com') }
  end
end
