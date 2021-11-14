# frozen_string_literal: true

class Public::QuizzesController < ApplicationController
  before_action :load_quiz

  def show
    load_quiz
    @quiz
  end

  private

    def load_quiz
      @quiz = Quiz.find_by_slug(params[:slug])

      unless @quiz
        render status: :not_found, json: { error: t("not_found", entity: "Quiz") }
      end
   end
end
