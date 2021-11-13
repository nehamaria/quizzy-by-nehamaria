# frozen_string_literal: true

class OptionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "sam@example.com", first_name: "sam", last_name: "roy", password: "1234qwe",
      password_confirmation: "1234qwe"
    )
    @quiz = @user.quizzes.new(
      title: "This is the first title")
    @question = @quiz.questions.new(
      title: "which planet is closest to sun",

    )
    @option = @question.options.new(
      name: "This is the option content",
      correct_answer: true
    )
    @option1 = @question.options.new(
      name: "This is the 2nd option content",
      correct_answer: false
    )
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
