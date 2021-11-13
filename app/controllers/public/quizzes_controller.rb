# frozen_string_literal: true
class Public::QuizzesController<ApplicationController
 before_action: load_quiz
 def show
  load_quiz
 end
 private
 def load_quiz
  @quiz=Quiz.find_by_slug(params[:slug])
  unless
    render status: :not_found, json: { error: t("quiz.not_found") }

 end
end
