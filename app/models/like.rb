# t.integer "liker_id", null: false
# t.string "liked_type", null: false
# t.integer "liked_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["liked_type", "liked_id"], name: "index_likes_on_liked_type_and_liked_id"
# t.index ["liker_id", "liked_type", "liked_id"], name: "index_likes_on_liker_id_and_liked_type_and_liked_id", unique: true

class Like < ApplicationRecord
  validates :liker,
            presence: { message: "There must be a liker." }
  validates :liked,
            presence: { message: "Something must be liked." }

  belongs_to :liker,
             class_name: "User",
             foreign_key: :liker_id

  belongs_to :liked, polymorphic: true
end
