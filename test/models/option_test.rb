# frozen_string_literal: true

require "test_helper"

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user: @user)
    @question = build(:question, quiz: @quiz)

    # @quiz = @user.quizzes.new(
    #   title: "This is the first title")
    # @question = @quiz.questions.new(
    #   title: "which planet is closest to sun",

    # )
    @option = build(:option, question: @question)
    @option1 = build(:option, question: @question)

    # @option = @question.options.new(
    #   name: "This is the option content",
    #   correct_answer: true
    # )
    # @option1 = @question.options.new(
    #   name: "This is the 2nd option content",
    #   correct_answer: false
    # )
  end

  def test_valid_option
    assert @option.valid?
  end

  def test_name_should_not_be_empty
    @option.name = nil
    puts @option.name
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Name can't be blank"
  end
end
