# frozen_string_literal: true

class QuestionTest < ActiveSupport::TestCase
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
    end

  def test_valid_question
    option1 = @question.options.new(name: "Hi", correct_answer: false)
    option2 = @question.options.new(name: "Hello", correct_answer: true)
    assert @question.valid?
  end

  def test_question_should_be_valid_and_saved_without_title
    @question.title = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Title can't be blank"
  end

  def test_option_should_be_invalid_with_more_than_four_options
    option1 = @question.options.new(name: "Option 1", correct_answer: false)
    option2 = @question.options.new(name: "Option 2", correct_answer: true)
    option3 = @question.options.new(name: "Option 3", correct_answer: false)
    option4 = @question.options.new(name: "Option 4", correct_answer: false)
    option5 = @question.options.new(name: "Option 5", correct_answer: false)

    assert_not @question.valid?
    assert_equal @question.errors.full_messages, ["Question should have minimum 2 and atmost 4 options"]
  end

  def test_question_can_have_only_one_correct_answer
    option1 = @question.options.new(name: "Option 1", correct_answer: false)
    option2 = @question.options.new(name: "Option 2", correct_answer: true)
    option3 = @question.options.new(name: "Option 3", correct_answer: true)
    option4 = @question.options.new(name: "Option 4", correct_answer: false)
    assert_not @question.valid?
    assert_equal @question.errors.full_messages, ["Options should have only one correct answer"]
  end
end
