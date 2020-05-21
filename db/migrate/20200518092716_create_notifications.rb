class CreateNotifications < ActiveRecord::Migration[6.0]
  def change
    create_table :notifications do |t|
      t.integer :notified_user_id, null: false
      t.string :message, null: false
      t.string :activity_type, null: false
      t.integer :activity_id, polymorphic: true, null: false
      t.timestamps
    end
    add_index :notifications, [:notified_user_id, :created_at]
    add_index :notifications, [:notified_user_id, :activity_type, :activity_id], name: "index_on_notified_user_id_and_activity_type_and_activity_id", unique: true
  end
end
