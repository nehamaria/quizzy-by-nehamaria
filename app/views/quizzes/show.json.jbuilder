# frozen_string_literal: true

json.quiz do
  json.id @quiz.id
  json.title @quiz.title
  json.publish @quiz.publish
  json.slug @quiz.slug
  json.questions @questions do |question|
    json.title question.title
    json.question_id question.id
    json.option do
      json.option_1 question.option1
      json.option_2 question.option2
      json.option_3 question.option3
      json.option_4 question.option4
    end
    json.correct_answer question.answer
  end
end
