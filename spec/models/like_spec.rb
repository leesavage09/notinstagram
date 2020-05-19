require "rails_helper"

RSpec.describe Like, type: :model do
  before(:each) do
    @user = build(:user)
    @user.save()

    user2 = build(:user)
    user2.save()

    user3 = build(:user)
    user3.save()

    @post = build(:post)
    @post.author = user2
    @post.save()

    @comment = build(:comment)
    @comment.author = user3
    @comment.parent = @post
    @comment.save()
  end

  it "like a post" do
    like = Like.new
    like.liker = @user
    like.liked = @post
    like.save()

    likeFound = Like.find_by(id: like.id)

    expect(like).to be_valid
    expect(likeFound).to be_an_instance_of Like
  end

  it "like a comment" do
    like = Like.new
    like.liker = @user
    like.liked = @comment
    like.save()

    likeFound = Like.find_by(id: like.id)

    expect(like).to be_valid
    expect(likeFound).to be_an_instance_of Like
  end

  it "There must be a liker" do
    like = Like.new
    like.liked = @comment
    like.save()

    expect(like).not_to be_valid
    expect(like.errors[:liker]).to include("There must be a liker.")
  end

  it "Something must be liked" do
    like = Like.new
    like.liker = @user
    like.save()

    expect(like).not_to be_valid
    expect(like.errors[:liked]).to include("Something must be liked.")
  end

  it "like is destroyed when the liked post is destroyed" do
    like = Like.new
    like.liker = @user
    like.liked = @post
    like.save()

    likeFound = Like.find_by(id: like.id)
    expect(likeFound).to be_an_instance_of Like

    @post.destroy()

    likeFound = Like.find_by(id: like.id)
    expect(likeFound).to be_nil
  end

  it "like is destroyed when the liked comment is destroyed" do
    like = Like.new
    like.liker = @user
    like.liked = @comment
    like.save()

    likeFound = Like.find_by(id: like.id)
    expect(likeFound).to be_an_instance_of Like

    @comment.destroy()

    likeFound = Like.find_by(id: like.id)
    expect(likeFound).to be_nil
  end
end
