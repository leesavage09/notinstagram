class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.integer :source_user_id, null: false
      t.integer :notified_user_id, null: false
      t.string :activity_type, null: false
      t.integer :activity_id, polymorphic: true, null: false
      t.timestamps
    end
    add_index :notifications, [:notified_user_id, :created_at]
  end
end
