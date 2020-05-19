class CreateTaggings < ActiveRecord::Migration[6.0]
  def change
    create_table :taggings do |t|
      t.integer :hashtag_id, null: false
      t.integer :post_id, null: false
      t.timestamps
    end
    add_index :taggings, [:hashtag_id, :post_id], unique: true 
    add_index :taggings, :post_id
  end
end
