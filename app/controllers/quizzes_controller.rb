# frozen_string_literal: true

class QuizzesController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz, only: %i[show destroy update]
  after_action :verify_policy_scoped, only: :index

  def index
    @quizzes = policy_scope(Quiz)
  end

  def create
    quiz = @current_user.quizzes.new(quiz_params)
    if quiz.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Quiz") }
    else
      errors = quiz.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    authorize @quiz
    if @quiz.destroy
      render status: :ok, json: { notice: t("successfully_deleted", entity: "Quiz") }
    else
      render status: :unprocessable_entity,
        json: { error: @quiz.errors.full_messages.to_sentence }
    end
  end

  def update
    authorize @quiz
    if quiz_params[:publish] == true
      @quiz.generate_slug
      if @quiz.save
        render status: :ok, json: { notice: "Quiz published" }
      else
        render status: :unprocessable_entity,
          json: { error: @quiz.errors.full_messages.to_sentence }
      end
    else
      if @quiz.update(quiz_params)
        render status: :ok, json: { notice: t("successfully_updated", entity: "Quiz") }
      else
        render status: :unprocessable_entity,
          json: { error: @quiz.errors.full_messages.to_sentence }
      end
    end
  end

  def show
    authorize @quiz
    @questions = @quiz.questions
  end

  private

    def quiz_params
      params.require(:quiz).permit(:title, :publish)
    end

    def load_quiz
      @quiz = @current_user.quizzes.find_by(id: params[:id])

      unless @quiz
        render status: :not_found, json: { error: t("quiz.not_found") }
      end
    end
end
