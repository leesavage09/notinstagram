class CreateLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :likes do |t|
      t.integer :liker_id, null: false
      t.string :liked_type, null: false
      t.integer :liked_id, polymorphic: true, null: false
      t.timestamps
    end
    add_index :likes, [:liker_id, :liked_type, :liked_id], unique: true
    add_index :likes, [:liked_type, :liked_id]
  end
end
