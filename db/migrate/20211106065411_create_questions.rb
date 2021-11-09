# frozen_string_literal: true

class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.string :option1, null: false
      t.string :option2, null: false
      t.string :option3
      t.string :option4
      t.string :answer, null: false
      t.references :quiz, null: false, foreign_key: true
      t.timestamps
    end
  end
end