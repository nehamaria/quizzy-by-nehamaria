# frozen_string_literal: true

class Question < ApplicationRecord
  validates :title, presence: true
  belongs_to :quiz
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  before_validation :validate_options

  private

    def validate_options
      options = self.options
      unless 2 <= options.length && options.length <= 4
        errors.add(:question, "should have minimum 2 and atmost 4 options")
      end
      unless options.select { |option| option[:correct_answer] == true }.length == 1
        errors.add(:options, "should have only one correct answer")
      end
    end
end
