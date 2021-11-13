# frozen_string_literal: true

require "test_helper"

class QuizTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "sam@example.com", first_name: "sam", last_name: "roy", password: "1234qwe",
      password_confirmation: "1234qwe"
    )
    @quiz = @user.quizzes.new(
      title: "This is the first title")
  end

  def test_title_should_be_of_valid_length
    @quiz.title = "a" * 100
    assert @quiz.invalid?
  end

  def test_for_valid_title
    @quiz.title = nil
    assert_not @quiz.save
    assert_equal @quiz.errors.full_messages, ["Title can't be blank"]
  end

  def test_quiz_should_be_valid
    @user.save!
    assert @quiz.valid?
  end

  def test_quiz_user_should_not_be_valid_without_user_id
    @quiz.user_id = nil

    assert_raises ActiveRecord::NotNullViolation do
      @quiz.save
    end
  end
end
