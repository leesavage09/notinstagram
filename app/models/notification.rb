# t.integer :notified_user_id, null: false
# t.string :message, null: false
# t.string :activity_type, null: false
# t.integer :activity_id, polymorphic: true, null: false
# :source_user_id, :integer, null: false
# :source_post_id, :integer, null: true
# :source_comment_id, :integer, null: true
# t.timestamps
# add_index :notifications, [:notified_user_id, :created_at]
# add_index :notifications, [:notified_user_id, :activity_type, :activity_id], name: "index_on_notified_user_id_and_activity_type_and_activity_id", unique: true

class Notification < ApplicationRecord
  before_validation :ensure_sources

  validates :notified_user,
            presence: { message: "The notification must notify a user" },
            uniqueness: { scope: :activity,
                          message: "Notification already exists" }
  validates :message,
            presence: { message: "You must have a message" }
  validates :activity,
            presence: { message: "Notifications must have an activity" }
  validates :source_user,
            presence: { message: "Notifications must have a source user" }

  belongs_to :activity,
             polymorphic: true

  belongs_to :notified_user,
             class_name: "User",
             foreign_key: :notified_user_id

  belongs_to :source_user,
             class_name: "User",
             foreign_key: :source_user_id

  belongs_to :source_post,
             optional: true,
             class_name: "Post",
             foreign_key: :source_post_id

  belongs_to :source_comment,
             optional: true,
             class_name: "Comment",
             foreign_key: :source_comment_id

  def activity_type=(type)
    raise "you cant set the activity_type directly"
  end

  def activity_id=(id)
    raise "you cant set the activity_id directly"
  end

  def ensure_sources
    case activity_type
    when "Follow"
      self.source_user_id = activity.follower_id
    when "Like"
      self.source_user_id = activity.liker.id
      case activity.liked_type
      when "Post"
        self.source_post_id = activity.liked_id
      when "Comment"
        self.source_comment_id = activity.liked_id
      end
    when "Comment"
      self.source_user_id = activity.author_id
      self.source_post_id = activity.parent_post_id
      self.source_comment_id = activity.id
    end
  end

  STARTED_FOLLOWING = " started following you"
  LIKED_POST = " liked your photo"
  LIKED_COMMENT = " liked your comment"
  COMMENTED_POST = " commented on your photo"
  REPLIED_COMMENTED = " replied to your comment"

  class << self
    def save_notification(notified_user_id, message, activity)
      note = Notification.new
      note.notified_user_id = notified_user_id
      note.message = message
      note.activity = activity
      note.save!()
    end
  end
end
