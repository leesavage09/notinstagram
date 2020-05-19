# t.integer "hashtag_id", null: false
# t.integer "post_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["hashtag_id", "post_id"], name: "index_taggings_on_hashtag_id_and_post_id", unique: true
# t.index ["post_id"], name: "index_taggings_on_post_id"

class Tagging < ApplicationRecord
  validates :hashtag,
            presence: { message: "There must be a hashtag." }
  validates :post,
            presence: { message: "There must be a post." }

  validates :post_id,
            uniqueness: { scope: :hashtag_id,
                          message: "A post can only be tagged ones with a hashtag." }

  belongs_to :hashtag,
             class_name: "Hashtag",
             foreign_key: :hashtag_id

  belongs_to :post,
    class_name: "Post",
    foreign_key: :post_id
end
