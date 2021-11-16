# frozen_string_literal: true

class Public::UsersController < ApplicationController
  before_action :load_quiz

  def create
    @user = User.find_by(email: user_params[:email])
    if @user
      @attempt = Attempt.find_by(user_id: @user.id, quiz_id: @quiz.id)
      unless @attempt
        create_attempt
      end
    else
      @user = User.new(user_params.merge(password: "welcome", password_confirmation: "welcome"))
      @user.save!
      create_attempt
    end
  end

  private

    def load_quiz
      @quiz = Quiz.find_by_slug(params[:slug])
      unless @quiz
        render status: :not_found, json: { error: "Quiz not found" }
      end
  end

    def create_attempt
      @attempt = @user.attempts.new(user_id: @user.id, quiz_id: @quiz.id, submit: false)
      @attempt.save!
    end

    def user_params
      params.require(:user).permit(:email, :first_name, :last_name)
    end

    def quiz_slug
      params.require(:user).permit(:slug)
    end
end
