# frozen_string_literal: true

FactoryBot.define do
  factory :quiz do
    user
    title { Faker::Name.name }
  end
end
