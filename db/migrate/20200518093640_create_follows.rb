class CreateFollows < ActiveRecord::Migration[6.0]
  def change
    create_table :follows do |t|
      t.integer :follower_id, null: false
      t.string :followed_type, null: false
      t.integer :followed_id, polymorphic: true, null: false
      t.timestamps
    end
    add_index :follows, :follower_id, unique: true
    add_index :follows, [:followed_type, :followed_id], unique: true
  end
end
