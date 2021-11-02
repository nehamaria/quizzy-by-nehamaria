# frozen_string_literal: true

class AddPassword < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :password, :string
  end
end
