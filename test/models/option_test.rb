# frozen_string_literal: true

class OptionTest < ActiveSupport::TestCase
  def setup
    @option = Option.create(
      name: "This is the option content",
      correct_answer: true
  end

  def test_valid_option
    assert @option.valid?
  end

  def test_name_should_not_be_empty
    @option.name=""
    assert_not @option.valid?
    assert_includes @option.errors.full_messages, "Name should not be empty"
  end
end
