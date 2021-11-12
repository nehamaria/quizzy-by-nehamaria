# frozen_string_literal: true

json.question do
    json.id @question.id
    json.title @question.title
    json.quiz @question.quiz.title
    json.option @question.options
  end
