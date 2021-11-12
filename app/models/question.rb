# frozen_string_literal: true

class Question < ApplicationRecord
  validates :title, presence: true
  belongs_to :quiz
  belongs_to :user
  has_many :options, dependent: :destroy
  accepts_nested_attributes_for :options, allow_destroy: true
end
