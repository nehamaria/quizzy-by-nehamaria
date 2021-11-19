# frozen_string_literal: true

class Question < ApplicationRecord
  validates :title, presence: true
  belongs_to :quiz
  has_many :options, dependent: :destroy
  has_many :attempt_answers, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  before_validation :validate_options

  private

    def validate_options
      options = self.options.select { |option| !option.marked_for_destruction? }
      unless 2 <= options.length && options.length <= 4
        errors.add(:base, t("question.should_have_minimum"))

      end
      unless options.select { |option| option[:correct_answer] == true }.length == 1
        errors.add(:base, t("option.should_have_only"))

      end
  end
end
