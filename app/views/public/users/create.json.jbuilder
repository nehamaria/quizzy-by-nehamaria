json.user do
   json.id @user.id
   json.quiz_id @quiz.id
   json.attempt_id @attempt.id
   json.email @user.email
   json.submit @attempt.submit
end
