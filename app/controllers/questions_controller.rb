# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_question, only: %i[destroy show update]
  def create
    question = Question.new(question_params.merge(user_id: @current_user.id))
    if question.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: error }
    end
  end

  def destroy
    if @question.destroy
      render status: :ok,
        json: { notice: "Successfully deleted questions" }
    else
      render status: :unprocessable_entity, json: { error: @question.error.full_messages.to_sentence }
    end
  end

  def show
    authorize @question
  end

  def update
    authorize @question
    if @question.update(question_params)
      render status: :ok, json: { notice: t("successfully_updated", entity: "Question") }
    else
      render status: :unprocessable_entity,
        json: { error: @question.errors.full_messages.to_sentence }
    end
  end

  private

    def load_question
      @question = Question.find_by(id: params[:id])
      unless @question
        render status: :not_found, json: { error: "Question not found" }
      end
   end

    def question_params
      params.require(:question).permit(:quiz_id, :title, :option1, :option2, :option3, :option4, :answer)
    end
end
