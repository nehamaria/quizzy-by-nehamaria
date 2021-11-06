# frozen_string_literal: true

class Question < ApplicationRecord
  validates :title, presence: true
  validates :option1, presence: true, null: false
  validates :option2, presence: true, null: false
  validates :answer, presence: true, null: false
  validate :answer_inclusion
end
