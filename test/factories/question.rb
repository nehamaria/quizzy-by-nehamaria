# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    quiz
    title { Faker::Name.name }
  end
end
