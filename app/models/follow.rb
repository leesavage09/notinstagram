# t.integer "follower_id", null: false
# t.string "followed_type", null: false
# t.integer "followed_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["followed_type", "followed_id"], name: "index_follows_on_followed_type_and_followed_id"
# t.index ["follower_id", "followed_type", "followed_id"], name: "index_follows_on_follower_id_and_followed_type_and_followed_id", unique: true

class Follow < ApplicationRecord
  validates :follower,
            presence: { message: "There must be a follower" }
  validates :followed,
            presence: { message: "Something must be followed" }
  validates :follower,
            uniqueness: { scope: :followed,
                          message: "User is already following this" }

  belongs_to :follower,
             class_name: "User",
             foreign_key: :follower_id

  belongs_to :followed, polymorphic: true

  after_destroy :destroy_notification

  def destroy_notification
    note = Notification.find_by(activity_type: "Follow", activity_id: id)
    note.destroy() if note
  end
end
