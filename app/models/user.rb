# frozen_string_literal: true

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i

  validates :first_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :last_name, presence: true, length: { maximum: Constants::MAX_NAME_LENGTH }
  validates :email, presence: true,
                    uniqueness: true,
                    length: { maximum: Constants::MAX_EMAIL_LENGTH },
                    format: { with: VALID_EMAIL_REGEX }
  before_save :email_lowercase

  private

    def email_lowercase
      email.downcase!
    end
end
