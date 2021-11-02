# frozen_string_literal: true

class RenamePassword < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :password, :password_digest
    change_column_null :users, :password_digest, null: false
  end
end
