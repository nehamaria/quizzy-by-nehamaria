# frozen_string_literal: true

class SessionsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, only: [:destroy]

  def create
    @user = User.find_by(email: login_params[:email])
    unless @user.present? && @user.authenticate(login_params[:password]) && @user.role == "administrator"
      render status: :unauthorized, json: { error: "Incorrect credentials, try again." }
    end
  end

  def destroy
    @current_user = nil
  end

  private

    def login_params
      params.require(:login).permit(:email, :password)
    end
end
