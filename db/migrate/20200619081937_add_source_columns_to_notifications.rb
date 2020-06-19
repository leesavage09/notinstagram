class AddSourceColumnsToNotifications < ActiveRecord::Migration[6.0]
  def self.up
    add_column :notifications, :source_user_id, :integer, null: true
    add_column :notifications, :source_post_id, :integer, null: true
    add_column :notifications, :source_comment_id, :integer, null: true

    Notification.all.each do |note|
      note.ensure_sources
      note.save!()
    end

    change_column :notifications, :source_user_id, :integer, null: false
  end
end
