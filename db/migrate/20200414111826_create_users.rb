class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name , limit: 30, null: true
      t.string :username, limit: 30, null: false
      t.string :bio, limit: 150, null: true
      t.string :email, limit: 254, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :profile_url, null: true

      t.timestamps
    end

    add_index :users, :name

    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
