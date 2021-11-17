# frozen_string_literal: true

class Public::AttemptsController < ApplicationController
  def show
    @attempt = Attempt.find_by_id(params[:id])
  end
end
