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
  before_validation :ensure_image_key

  validates :caption,
            length: { maximum: 2200, message: "Post captions must under 2200 characters" }
  validates :image_url,
            presence: { message: "The post must have a photo URL" }
  validates :author,
            presence: { message: "The post must have an author" }
  validate :validate_post_max_taggings

  belongs_to :author,
             class_name: "User",
             foreign_key: :author_id

  has_many :taggings,
           class_name: "Tagging",
           foreign_key: :post_id,
           dependent: :destroy

  has_many :hashtags,
           through: :taggings,
           source: :hashtag

  has_many :likes, -> { where liked_type: "Post" },
           class_name: "Like",
           foreign_key: :liked_id,
           dependent: :destroy

  has_many :comments, -> { where(parent_type: "Post").order(created_at: :asc) },
           class_name: "Comment",
           foreign_key: :parent_id,
           dependent: :destroy

  def validate_post_max_taggings
    errors.add(:max_taggings, "A post can only be tagged a maximum of 30 times") if taggings.size > 30
  end

  def ensure_image_key
    self.image_key ||= User.generate_image_key
  end

  def image_url
    if Rails.env.development? && self[:image_url] && self[:image_url].include?("picsum.photos")
      return self[:image_url] if self[:image_url]
      return nil
    end
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
