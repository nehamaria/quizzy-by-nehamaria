# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  after_action :verify_policy_scoped, only: :index

  def create
    quiz = Quiz.new(quiz_params.merge(user_id: @current_user.id))
    if quiz.save
      render status: :ok,
        json: { notice: t("successfully_created_quiz", entity: "Quiz") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def index
    @quizzes = policy_scope(Quiz)
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title)
    end
end
