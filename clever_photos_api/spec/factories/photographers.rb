FactoryBot.define do
  factory :photographer do
    name { Faker::Name.name }
    url { Faker::Internet.unique.url(host: 'pexels.com') }
  end
end
