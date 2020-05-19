# t.integer "source_user_id", null: false
# t.integer "notified_user_id", null: false
# t.string "activity_type", null: false
# t.integer "activity_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["notified_user_id", "created_at"], name: "index_notifications_on_notified_user_id_and_created_at"

class Notification < ApplicationRecord
  validates :source_user,
            presence: { message: "The notification must have a source user." }

  validates :notified_user,
            presence: { message: "The notification must notify a user." }

  validates :activity,
            presence: { message: "Notifications must have an activity" }

  belongs_to :activity,
             polymorphic: true

  belongs_to :notified_user,
             class_name: "User",
             foreign_key: :notified_user_id

  belongs_to :source_user,
             class_name: "User",
             foreign_key: :source_user_id
end
