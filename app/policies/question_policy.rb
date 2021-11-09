# frozen_string_literal: true

class QuestionPolicy
  attr_reader :user, :question

  def initialize(user, question)
    @user = user
    @question = question
  end

  def show?
    question.user_id == user.id
  end

  def destroy?
    show?
  end

  def update?
    show?
  end
end
