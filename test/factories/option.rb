# frozen_string_literal: true

FactoryBot.define do
  factory :option do
    question
    name { Faker::Name.name }
    correct_answer { Faker::Name.name }

  end
end
