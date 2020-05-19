require "rails_helper"

def makePost
  user = build(:user)
  user.save()

  post = build(:post)
  post.author = user
  post.save()

  post
end

RSpec.describe Post, type: :model do
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
  end

  string_len_2200 = "0" * 2200
  string_len_2201 = "0" * 2201

  it "create and find post" do
    post = makePost
    post2 = Post.find(post.id)
    expect(post == post2)
  end

  it "post must have an author" do
    post = build(:post)
    post.save()
    expect(post).not_to be_valid

    expect(post.errors[:author]).to include("The post must have an author.")
  end

  it "post caption less than 2200 char" do
    post = makePost
    post.caption = string_len_2200
    post.save()
    expect(post).to be_valid

    post = makePost
    post.caption = string_len_2201
    post.save()
    expect(post).not_to be_valid

    expect(post.errors[:caption]).to include("Post caption must be less than 2200 characters.")
  end

  it "a post can have a maximum of 30 hastags" do
    30.times {
      tagging = Tagging.new
      tagging.hashtag = build(:hashtag)
      tagging.post = @post
      tagging.save()
      expect(tagging).to be_valid
    }

    expect(@post).to be_valid

    tagging = Tagging.new
    tagging.hashtag = build(:hashtag)
    tagging.post = @post
    tagging.save()
    
    expect(@post).not_to be_valid

    foundPost = Post.find(@post.id)
    expect(foundPost).not_to be_valid
  end
end
