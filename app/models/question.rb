# frozen_string_literal: true

class Question < ApplicationRecord
  validates :title, presence: true
  validates :option1, presence: true
  validates :option2, presence: true
  validates :answer, presence: true
  validate :answer_inclusion
  belongs_to :quiz

  private

    def answer_inclusion
      unless [ option1, option2, option3, option4 ].include? answer
        errors.add(:base, "Answer does not exist in options")
      end
    end
end
