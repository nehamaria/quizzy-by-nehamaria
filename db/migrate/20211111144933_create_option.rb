# frozen_string_literal: true

class CreateOption < ActiveRecord::Migration[6.1]
  def change
    create_table :options do |t|
      t.string :name
      t.boolean :correct_answer, null: false
      t.references :question, null: false, foreign_key: true
      t.timestamps
    end
  end
end
