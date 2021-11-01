# frozen_string_literal: true

class AddIndexToUser < ActiveRecord::Migration[6.1]
  def change
    add_index :users, :email
  end
end
