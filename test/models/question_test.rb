# frozen_string_literal: true

class QuestionTest < ActiveSupport::TestCase
  def setup
    @user = User.create(
      email: "sam@example.com", first_name: "sam", last_name: "roy", password: "1234qwe",
      password_confirmation: "1234qwe"
    )
    @quiz = Quiz.create(
      title: "This is the first title", user_id: @user.id)
    @question = Question.new(
      title: "which planet is closest to sun",
      quiz_id: @quiz.id,
      user_id: @user.id,
      option1: "Option 1",
      option2: "Option 2",
      option3: "Option 3",
      option4: "Option 4",
      answer: "Option 1"
    )
    end

  def test_valid_question
    assert @question.valid?
  end

  def test_question_should_be_valid_and_saved_without_title
    @question.title = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Title can't be blank"
  end

  def test_question_should_not_be_valid_and_saved_without_option1
    @question.option1 = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option1 can't be blank"
  end

  def test_question_should_not_be_valid_and_saved_without_option2
    @question.option2 = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Option2 can't be blank"
  end

  def test_question_should_not_be_valid_and_saved_without_answer
    @question.answer = ""
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Answer can't be blank"
  end

  def test_question_can_be_valid_and_saved_without_option3
    @question.option3 = nil
    assert @question.valid?
  end

  def test_question_can_be_valid_and_saved_without_option4
    @question.option4 = nil
    assert @question.valid?
  end

  def test_answer_should_not_be_different_from_options
    @question.answer = "Option 5"
    assert_not @question.valid?
    assert_includes @question.errors.full_messages, "Answer does not exist in options"
  end

  def test_answer_should_exist_in_options
    @question.answer = "Option 1"
    assert @question.valid?
  end
end
