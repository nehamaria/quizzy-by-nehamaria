# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: %i[index]

  def index
    @reports = []
    @current_user.quizzes.each do |quiz|
      @reports.push(*quiz.attempts.where(submit: true))
    end
  end

  def show
    @attempt = Attempt.find_by_id(params[:id])
  end
end
