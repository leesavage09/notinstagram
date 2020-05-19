class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.string :body, limit: 2200, null: false
      t.string :parent_type, null: false
      t.integer :parent_id, polymorphic: true, null: false
      t.timestamps
    end
    add_index :comments, :author_id
    add_index :comments, [:parent_type, :parent_id]
  end
end
