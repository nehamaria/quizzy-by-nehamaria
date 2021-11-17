json.verified @quiz.slug.present?
json.quiz @quiz.questions do |question|
  json.question question.title
  json.question_id question.id
  json.options question.options do |option|
    json.id option.id
    json.name option.name
  end
end
