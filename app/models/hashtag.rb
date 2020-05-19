# t.string "name", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["tag_name"], name: "index_hashtags_on_tag_name", unique: true

class Hashtag < ApplicationRecord
  validates :name,
            presence: { message: "The hashtag must have a name." }

  has_many :posts,
           through: :taggings,
           source: :post

  has_many :inward_followers, -> { where followed_type: "hashtag" },
           class_name: "Follow",
           foreign_key: :followed_id
end
