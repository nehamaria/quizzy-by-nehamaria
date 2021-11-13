# frozen_string_literal: true

class Question < ApplicationRecord
  validates :title, presence: true
  belongs_to :quiz
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
  # before_validations :validate_options

  # private
  # def validate_options
  #   options=self.options
  #   unless 2<=options.length && options.length<=4
  #     errors.add(:option)
  #   end
  # end
end
