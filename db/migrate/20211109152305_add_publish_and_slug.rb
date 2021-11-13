# frozen_string_literal: true

class AddPublishAndSlug < ActiveRecord::Migration[6.1]
  def change
    add_column :quizzes, :slug, :string, index: { unique: true }
  end
end
