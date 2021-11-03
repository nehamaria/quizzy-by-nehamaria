# frozen_string_literal: true

class Quiz < ApplicationRecord
  validates :first_name, presence: true, uniqueness: true, length: { maximum: Constants::MAX_TITLE_LENGTH }
end
