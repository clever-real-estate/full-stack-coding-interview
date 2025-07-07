FactoryBot.define do
  factory :like do
    association :user
    association :photo
  end
end
