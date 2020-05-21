# t.integer "hashtag_id", null: false
# t.integer "post_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["hashtag_id", "post_id"], name: "index_taggings_on_hashtag_id_and_post_id", unique: true
# t.index ["post_id"], name: "index_taggings_on_post_id"

class Tagging < ApplicationRecord
  validates :hashtag,
            presence: { message: "There must be a hashtag" }
  validates :post,
            presence: { message: "There must be a post" }
  validates :post,
            uniqueness: { scope: :hashtag,
                          message: "A post can only be tagged once with a particular hashtag" }
  validate :validate_post_max_taggings

  belongs_to :hashtag,
             class_name: "Hashtag",
             foreign_key: :hashtag_id

  belongs_to :post,
    class_name: "Post",
    foreign_key: :post_id

  def validate_post_max_taggings
    if Tagging.where(post_id: post_id).count > 30
      errors.add(:max_taggings, "A post can only be tagged a maximum of 30 times")
    end
  end
end
