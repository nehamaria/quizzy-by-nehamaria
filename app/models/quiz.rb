# frozen_string_literal: true

class Quiz < ApplicationRecord
  validates :title, presence: true, length: { maximum: Constants::MAX_TITLE_LENGTH }
  belongs_to :user
end
