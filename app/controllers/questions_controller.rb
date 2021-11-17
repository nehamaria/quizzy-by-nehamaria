# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_quiz
  def create
    question = @quiz.questions.new(question_params)

    if question.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  def destroy
    load_question
    if @question.destroy
      render status: :ok,
        json: { notice: "Successfully deleted questions" }
    else
      render status: :unprocessable_entity, json: { error: @question.error.full_messages.to_sentence }
    end
  end

  def show
    load_question
  end

  def update
    load_question
    if @question.update(question_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Question") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by(id: params[:quiz_id])
      unless @quiz
        render status: :not_found, json: { error: "Question not found" }
      end
    end

    def load_question
      authorize @quiz
      @question = @quiz.questions.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: "Question not found" }
      end
   end

    def question_params
      params.require(:question).permit(:title, options_attributes: [:id, :correct_answer, :name, :_destroy])
    end
end
