# frozen_string_literal: true

class Public::AttemptedAnswersController < ApplicationController
  before_action :load_attempt
  def create
    @correct_count = 0
    @incorrect_count = 0
    if @attempt.submit
      render status: :unprocessable_entity, json: { error: "Quiz has already been attended" }
    else
      load_params[:attempts].each do |attempt_details|
      attempt_answer = @attempt.attempted_answers.new(attempt_details)
      attempt_answer.save!
      option = Option.find_by_id(attempt_details[:attempted_answer])
      if option && option.correct_answer
        @correct_count += 1
      else
        @incorrect_count += 1
      end
    end
      @attempt.update(submit: true, correct_answers_count: @correct_count, incorrect_answers_count: @incorrect_count)
    end
  end

  private

    def load_attempt
      @attempt = Attempt.find_by_id(load_params[:attempt_id])
      unless @attempt
        render status: :not_found, json: { error: t("not_found", entity: "Attempt") }
      end
    end

    def load_params
      params.require(:answer).permit(:attempt_id, attempts: [:question_id, :attempted_answer])
    end
end
