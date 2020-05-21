# t.integer "author_id", null: false
# t.string "body", limit: 2200, null: false
# t.string "parent_type", null: false
# t.integer "parent_id", null: false
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["author_id"], name: "index_comments_on_author_id"
# t.index ["parent_type", "parent_id"], name: "index_comments_on_parent_type_and_parent_id"

class Comment < ApplicationRecord
  validates :body,
            presence: { message: "The comment must have a body" },
            length: { maximum: 2200, message: "Comment body must be less than 2200 characters" }
  validates :author,
            presence: { message: "The comment must have an author" }
  validates :parent,
            presence: { message: "The comment must have a parent" }

  belongs_to :author,
             class_name: "User",
             foreign_key: :author_id

  belongs_to :parent,
             polymorphic: true

  has_many :comments, -> { where parent_type: 'Comment' },
           class_name: "Comment",
           foreign_key: :parent_id,
           dependent: :destroy

  has_many :likes, -> { where liked_type: "Comment" },
           class_name: "Like",
           foreign_key: :liked_id,
           dependent: :destroy


  after_destroy :destroy_notification

  def destroy_notification
    note = Notification.find_by(activity_type: "Comment", activity_id: id)
    note.destroy() if note
  end
end
