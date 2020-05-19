# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_18_094900) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "body", limit: 2200, null: false
    t.string "parent_type", null: false
    t.integer "parent_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_id"], name: "index_comments_on_author_id"
    t.index ["parent_type", "parent_id"], name: "index_comments_on_parent_type_and_parent_id"
  end

  create_table "follows", force: :cascade do |t|
    t.integer "follower_id", null: false
    t.string "followed_type", null: false
    t.integer "followed_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["followed_type", "followed_id"], name: "index_follows_on_followed_type_and_followed_id", unique: true
    t.index ["follower_id"], name: "index_follows_on_follower_id", unique: true
  end

  create_table "hashtags", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_hashtags_on_name", unique: true
  end

  create_table "likes", force: :cascade do |t|
    t.integer "liker_id", null: false
    t.string "liked_type", null: false
    t.integer "liked_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["liked_type", "liked_id"], name: "index_likes_on_liked_type_and_liked_id"
    t.index ["liker_id", "liked_type", "liked_id"], name: "index_likes_on_liker_id_and_liked_type_and_liked_id", unique: true
  end

  create_table "notifications", force: :cascade do |t|
    t.integer "source_user_id", null: false
    t.integer "notified_user_id", null: false
    t.string "activity_type", null: false
    t.integer "activity_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["notified_user_id", "created_at"], name: "index_notifications_on_notified_user_id_and_created_at"
  end

  create_table "posts", force: :cascade do |t|
    t.integer "author_id", null: false
    t.string "caption", limit: 2200
    t.string "image_key", null: false
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_id"], name: "index_posts_on_author_id"
    t.index ["created_at"], name: "index_posts_on_created_at"
  end

  create_table "taggings", force: :cascade do |t|
    t.integer "hashtag_id", null: false
    t.integer "post_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hashtag_id", "post_id"], name: "index_taggings_on_hashtag_id_and_post_id", unique: true
    t.index ["post_id"], name: "index_taggings_on_post_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", limit: 30
    t.string "username", limit: 30, null: false
    t.string "bio", limit: 150
    t.string "email", limit: 254, null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "image_key", null: false
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["image_key"], name: "index_users_on_image_key", unique: true
    t.index ["name"], name: "index_users_on_name"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
