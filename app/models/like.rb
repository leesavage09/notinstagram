# t.integer "liker_id", null: false
# t.string "liked_type", null: false
# t.integer "liked_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["liked_type", "liked_id"], name: "index_likes_on_liked_type_and_liked_id"
# t.index ["liker_id", "liked_type", "liked_id"], name: "index_likes_on_liker_id_and_liked_type_and_liked_id", unique: true

class Like < ApplicationRecord
  validates :liker,
            presence: { message: "There must be a liker" }
  validates :liked,
            presence: { message: "Something must be liked" }
  validates :liker,
            uniqueness: { scope: :liked,
                          message: "Can only be liked once" }

  belongs_to :liker,
             class_name: "User",
             foreign_key: :liker_id

  belongs_to :liked, polymorphic: true

  after_destroy :destroy_notification

  def destroy_notification
    note = Notification.find_by(activity_type: "Like", activity_id: id)
    note.destroy() if note
  end
end
