# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @quiz = Quiz.new(
      title: "This is the first title", user_id: 1)

    @user = User.new(
      email: "sam@example.com", first_name: "sam", last_name: "roy", password: "1234qwe",
      password_confirmation: "1234qwe"
    )
  end

  def test_title_should_be_of_valid_length
    @quiz.title = "a" * 100
    assert @quiz.invalid?
  end

  def test_for_valid_title
    @quiz.title = nil
    assert_not @quiz.save
  end

  def test_quiz_should_be_valid
    @user.save!
    assert @quiz.valid?
  end

  def test_user_should_not_be_valid_without_user
    assert_not @quiz.valid?
    assert_equal @quiz.errors.full_messages, ["User must exist"]
  end
end
