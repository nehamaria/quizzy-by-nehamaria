# frozen_string_literal: true

class Quiz < ApplicationRecord
  MAX_TITLE_LENGTH = 50
  is_sqlite_db = ActiveRecord::Base.connection_db_config.configuration_hash[:adapter] == "sqlite3"
  DB_REGEX_OPERATOR = is_sqlite_db ? "REGEXP" : "~*"

  enum publish: { not_publish: 0, published: 1 }

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }
  belongs_to :user
  has_many :question, dependent: :destroy
  before_save :generate_slug, if: -> { publish == "published" && slug.nil? }

  private

    def generate_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{DB_REGEX_OPERATOR} ?"
      latest_quiz_slug = Quiz.where(
        regex_pattern,
        "#{title_slug}$|#{title_slug}-[0-9]+$"
      ).order(slug: :desc).first&.slug
      slug_count = 0
      if latest_quiz_slug.present?
        slug_count = latest_quiz_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end
end
