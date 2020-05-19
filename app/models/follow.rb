# t.integer "follower_id", null: false
# t.string "followed_type", null: false
# t.integer "followed_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["followed_id"], name: "index_follows_on_followed_id", unique: true
# t.index ["follower_id"], name: "index_follows_on_follower_id", unique: true

class Follow < ApplicationRecord
  validates :follower,
            presence: { message: "There must be a follower." }
  validates :followed,
            presence: { message: "Something must be followed." }

  belongs_to :follower,
             class_name: "User",
             foreign_key: :follower_id

  belongs_to :followed, polymorphic: true
end
