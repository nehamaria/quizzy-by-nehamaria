json.attempt do
  json.extract! @attempt,
  :id,
  :correct_answers_count,
  :incorrect_answers_count
  json.questions @attempt.quiz.questions do |question|
    json.question question
    json.options question.options
  end
  json.attempt_answer @attempt.attempted_answers do |attempted_answer|
    json.question_id attempted_answer.question.id
    json.attempted_answer attempted_answer.attempted_answer #option_id
    json.correct_answer attempted_answer.question.options.select{|option|option.correct_answer}[0].id

  end
  json.quiz_name @attempt.quiz.title
  json.correct_answers @attempt.correct_answers_count
  json.incorrect_answers @attempt.incorrect_answers_count
end
