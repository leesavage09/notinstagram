# t.integer :notified_user_id, null: false
# t.string :message, null: false
# t.string :activity_type, null: false
# t.integer :activity_id, polymorphic: true, null: false
# t.timestamps
# add_index :notifications, [:notified_user_id, :created_at]
# add_index :notifications, [:notified_user_id, :activity_type, :activity_id], name: "index_on_notified_user_id_and_activity_type_and_activity_id", unique: true

class Notification < ApplicationRecord
  validates :notified_user,
            presence: { message: "The notification must notify a user" },
            uniqueness: { scope: :activity,
                          message: "Notification already exists" }
  validates :message,
            presence: { message: "You must have a message" }
  validates :activity,
            presence: { message: "Notifications must have an activity" }

  belongs_to :activity,
             polymorphic: true

  belongs_to :notified_user,
             class_name: "User",
             foreign_key: :notified_user_id

  STARTED_FOLLOWING = "started following you"
  LIKED_POST = "liked your post"
  LIKED_COMMENT = "liked your comment"
  COMMENTED_POST = "commented on your post"
  REPLIED_COMMENTED = "replied to your comment"
end
