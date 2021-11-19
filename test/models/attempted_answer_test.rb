# frozen_string_literal: true

require "test_helper"

class AttemptedAnswerTest < ActiveSupport::TestCase
  def setup
    @quiz = create(:quiz)
    @question = build(:question)
    option = @question.options.new(name: "Option 1", correct_answer: true)
    option2 = @question.options.new(name: "Option 2", correct_answer: false)
    @question.save!

    @attempted_answer = create(:attempt_answer, question: @question, attempted_answer: option.id)
  end

  def test_attempt_answers_should_be_valid
    assert @attempted_answer.valid?
  end

  def test_attempt_answer_should_not_be_valid_without_question_and_attempt
    @attempted_answer.attempt = nil
    @attempted_answer.question = nil
    assert_not @attempted_answer.valid?
    assert_equal @attempted_answer.errors.full_messages, ["Attempt must exist", "Question must exist"]
  end
end
