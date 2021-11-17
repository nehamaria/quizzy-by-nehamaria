# frozen_string_literal: true

require "test_helper"

class AttemptTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @quiz = create(:quiz, user: @user)
    @attempt = build(:attempt, user: @user, quiz: @quiz)
  end

  def test_attempt_must_be_valid
    assert @attempt.valid?
  end

  def test_attempt_must_not_be_submitted_by_default
    @attempt.save!
    assert_equal @attempt.submit, false
  end

  def test_attempt_should_not_be_valid_without_user_and_quiz
    @attempt.user_id = nil
    @attempt.quiz_id = nil
    assert_not @attempt.valid?
    assert_equal @attempt.errors.full_messages, ["Quiz must exist", "User must exist"]
  end
end
