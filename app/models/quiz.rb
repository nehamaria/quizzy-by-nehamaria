# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_TITLE_LENGTH = 50
  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  belongs_to :user
end
