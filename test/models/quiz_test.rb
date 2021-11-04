# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = Quiz.new(
      title: "This is the first title")
  end

  def test_title_should_be_of_valid_length
    @quiz.title = "a" * 100
    assert @quiz.invalid?
  end

  def test_for_valid_title
    @quiz.title = nil
    assert_not @quiz.save
  end
end
