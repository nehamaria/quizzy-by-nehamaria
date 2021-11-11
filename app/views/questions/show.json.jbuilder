# frozen_string_literal: true

json.question do
    json.id @question.id
    json.title @question.title
    json.quiz @question.quiz.title
    json.option do
      json.option_1 @question.option1
      json.option_2 @question.option2
      json.option_3 @question.option3
      json.option_4 @question.option4
    end
    json.correct_answer @question.answer
  end
