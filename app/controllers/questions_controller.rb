# frozen_string_literal: true

class QuestionsController < ApplicationController
  def create
    question = Question.new(question_params)
    if question.save
      render status: :ok,
        json: { notice: t("successfully_created", entity: "Question") }
    else
      errors = question.errors.full_messages.to_sentence
      render status: :unprocessable_entity, json: { error: errors }
    end
  end

  private

    def question_params
      params.require(:question).permit(:quiz_id, :title, :option1, :option2, :option3, :option4, :answer)
    end
end
