# frozen_string_literal: true

FactoryBot.define do
  factory :attempt do
    quiz
    user
  end
end
