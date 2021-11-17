# frozen_string_literal: true

json.quiz do
  json.id @quiz.id
  json.title @quiz.title
  json.slug @quiz.slug
  json.questions @questions do |question|
    json.title question.title
    json.question_id question.id
    json.options question.options
  end
end
