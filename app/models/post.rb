# t.integer "author_id", null: false
# t.string "caption", limit: 2200
# t.string "image_key", null: false
# t.string "image_url"
# t.datetime "created_at", precision: 6, null: false
# t.datetime "updated_at", precision: 6, null: false
# t.index ["author_id"], name: "index_posts_on_author_id"
# t.index ["created_at"], name: "index_posts_on_created_at"

require_relative "../services/amazon_s3_service.rb"

class Post < ApplicationRecord
  validates :caption,
            length: { maximum: 2200, message: "Post caption must be less than 2200 characters." }

  belongs_to :author,
             class_name: "User",
             foreign_key: :author_id

  validates :author,
            presence: { message: "The post must have an author." }

  has_many :taggings,
           class_name: "Tagging",
           foreign_key: :post_id,
           dependent: :destroy

  has_many :hashtags,
           through: :taggings,
           source: :hashtag

  validate :validate_taggings

  def validate_taggings
    errors.add(:taggings, "A post can have a maximum of 30 taggings.") if taggings.size > 30
  end

  has_many :likes, -> { where liked_type: "Post" },
           class_name: "Like",
           foreign_key: :liked_id,
           dependent: :destroy

  has_many :comments,
           class_name: "Comment",
           foreign_key: :parent_id,
           dependent: :destroy

  before_validation :ensure_image_key

  def ensure_image_key
    self.image_key ||= User.generate_image_key
  end

  def image_url
    return ENV["AWS_URL"] + "/" + self[:image_url] if self[:image_url]
    nil
  end

  def image_s3_post_url
    presigned = AmazonS3Service.get_presigned_post(key: "post/" + self.image_key + ".jpg")
    {
      url: presigned.url,
      url_fields: presigned.fields,
    }
  end

  class << self
    def generate_image_key
      loop do
        key = SecureRandom::uuid
        break key unless Post.where(image_key: key).exists?
      end
    end
  end
end
