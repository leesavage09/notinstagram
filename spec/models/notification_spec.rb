require "rails_helper"

RSpec.describe Notification, type: :model do
  before(:each) do
    @user = build(:user)
    @user.save!()

    user2 = build(:user)
    user2.save!()

    user3 = build(:user)
    user3.save!()

    user4 = build(:user)
    user4.save!()

    user5 = build(:user)
    user5.save!()

    user6 = build(:user)
    user6.save!()

    @post = build(:post)
    @post.author = user2
    @post.save!()

    @likePost = Like.new
    @likePost.liker = user3
    @likePost.liked = @post
    @likePost.save!()

    @commentPost = build(:comment)
    @commentPost.author = user4
    @commentPost.parent = @post
    @commentPost.parent_post = @post
    @commentPost.save!()

    @likeComment = Like.new
    @likeComment.liker = user3
    @likeComment.liked = @commentPost
    @likeComment.save!()

    @commentComment = build(:comment)
    @commentComment.author = user4
    @commentComment.parent = @commentPost
    @commentComment.parent_post = @post
    @commentComment.save!()

    @follow = Follow.create({
      follower: user5,
      followed: user6,
    })

    @post.save!()
  end

  it "Create a notification when a post is liked" do
    note = Notification.new
    note.notified_user = @likePost.liked.author
    note.activity = @likePost
    note.message = Notification::LIKED_POST
    note.save()
    expect(note).to be_valid
  end

  it "Create a notification when comment is liked" do
    note = Notification.new
    note.notified_user = @likeComment.liked.author
    note.activity = @likeComment
    note.message = Notification::LIKED_COMMENT
    note.save()
    expect(note).to be_valid
  end

  it "Create a notification when a post is commented on" do
    note = Notification.new
    note.notified_user = @commentPost.parent.author
    note.activity = @commentPost
    note.message = Notification::COMMENTED_POST
    note.save()
    expect(note).to be_valid
  end

  it "Create a notification when a comment is replied to" do
    note = Notification.new
    note.notified_user = @commentComment.parent.author
    note.activity = @commentComment
    note.message = Notification::REPLIED_COMMENTED
    note.save()
    expect(note).to be_valid
  end

  it "Create a notification when a user gains a new follower" do
    note = Notification.new
    note.message = Notification::STARTED_FOLLOWING
    note.activity = @follow
    note.notified_user = @follow.followed
    note.save()
    expect(note).to be_valid
  end

  it "Follow notifications are destroyed when a follow is destroyed" do
    note = Notification.new
    note.message = Notification::STARTED_FOLLOWING
    note.activity = @follow
    note.notified_user = @follow.followed
    note.save()
    expect(note).to be_valid

    found = Notification.find_by(id: note.id)
    expect(found).to be_an_instance_of Notification

    @follow.destroy()

    found = Notification.find_by(id: note.id)
    expect(found).to be_nil
  end

  it "Comment notifications are destroyed when the comment is destroyed" do
    note = Notification.new
    note.notified_user = @commentPost.parent.author
    note.activity = @commentPost
    note.message = Notification::COMMENTED_POST
    note.save()
    expect(note).to be_valid

    found = Notification.find_by(id: note.id)
    expect(found).to be_an_instance_of Notification

    @commentPost.destroy()

    found = Notification.find_by(id: note.id)
    expect(found).to be_nil
  end

  it "Like notifications are destroyed when the like is destroyed" do
    note = Notification.new
    note.notified_user = @likeComment.liked.author
    note.activity = @likeComment
    note.message = Notification::LIKED_COMMENT
    note.save()
    expect(note).to be_valid

    found = Notification.find_by(id: note.id)
    expect(found).to be_an_instance_of Notification

    @likeComment.destroy()

    found = Notification.find_by(id: note.id)
    expect(found).to be_nil
  end

  it "Throws an error if there is no message" do
    note = Notification.new
    note.notified_user = @likePost.liked.author
    note.activity = @likePost
    note.message = nil
    note.save()

    expect(note).not_to be_valid
    expect(note.errors[:message]).to include("You must have a message")
  end

  it "Throws an error if there is no notified user" do
    note = Notification.new
    note.notified_user = nil
    note.activity = @likePost
    note.message = Notification::LIKED_POST
    note.save()

    expect(note).not_to be_valid
    expect(note.errors[:notified_user]).to include("The notification must notify a user")
  end

  it "Throws an error if there is no activity" do
    note = Notification.new
    note.notified_user = @likePost.liked.author
    note.activity = nil
    note.message = Notification::LIKED_POST
    note.save()

    expect(note).not_to be_valid
    expect(note.errors[:activity]).to include("Notifications must have an activity")
  end

  it "Throws an error if a user is notified about an activity twice" do
    note = Notification.new
    note.notified_user = @likePost.liked.author
    note.activity = @likePost
    note.message = Notification::LIKED_POST
    note.save()
    expect(note).to be_valid

    note = Notification.new
    note.notified_user = @likePost.liked.author
    note.activity = @likePost
    note.message = Notification::LIKED_POST
    note.save()
    expect(note).not_to be_valid

    expect(note.errors[:notified_user]).to include("Notification already exists")
  end

  it "Raise Error if activity id is set" do
    note = Notification.new
    expect {
      note.activity_id = @likePost.id
    }.to raise_error("you cant set the activity_id directly")
  end

  it "Raise Error if activity type is set" do
    note = Notification.new
    expect {
      note.activity_type = "Like"
    }.to raise_error("you cant set the activity_type directly")
  end


end
