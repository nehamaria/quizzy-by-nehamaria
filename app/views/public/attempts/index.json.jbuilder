
json.reports do
  json.reports @reports do |report|
  json.quiz_name report.quiz.title
  json.first_name report.user.first_name
  json.last_name report.user.last_name
  json.email report.user.email
  json.correct_answers report.correct_answers_count
  json.incorrect_answers report.incorrect_answers_count
  end
end
