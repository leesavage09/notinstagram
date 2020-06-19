require "rails_helper"

RSpec.describe Like, type: :model do
  before(:each) do
    @user = build(:user)
    @user.save!()

    user2 = build(:user)
    user2.save!()

    user3 = build(:user)
    user3.save!()

    @post = build(:post)
    @post.author = user2
    @post.save!()

    @comment = build(:comment)
    @comment.author = user3
    @comment.parent = @post
    @comment.parent_post_id = @post.id
    @comment.save!()
  end

  it "Like a post" do
    like = Like.new
    like.liker = @user
    like.liked = @post
    like.save()

    likeFound = Like.find_by(id: like.id)

    expect(like).to be_valid
    expect(likeFound).to be_an_instance_of Like
  end

  it "Like a comment" do
    like = Like.new
    like.liker = @user
    like.liked = @comment
    like.save()

    likeFound = Like.find_by(id: like.id)

    expect(like).to be_valid
    expect(likeFound).to be_an_instance_of Like
  end

  it "Like is destroyed when the liked post is destroyed" do
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

  it "Like is destroyed when the liked comment is destroyed" do
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

  it "Throws an error if there is no liker" do
    like = Like.new
    like.liked = @comment
    like.save()

    expect(like).not_to be_valid
    expect(like.errors[:liker]).to include("There must be a liker")
  end

  it "Throws an error if nothing is liked" do
    like = Like.new
    like.liker = @user
    like.save()

    expect(like).not_to be_valid
    expect(like.errors[:liked]).to include("Something must be liked")
  end

  it "Throws an error if a something is liked twice" do
    like = Like.new
    like.liker = @user
    like.liked = @post
    like.save()
    expect(like).to be_valid

    like2 = Like.new
    like2.liker = @user
    like2.liked = @post
    like2.save()

    expect(like2).not_to be_valid
    expect(like2.errors[:liker]).to include("Can only be liked once")
    
  end
end
