# frozen_string_literal: true

json.array! @quizzes do |quiz|
  json.id quiz.id
  json.title quiz.title
  json.created_at quiz.created_at
end
