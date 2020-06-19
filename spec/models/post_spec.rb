require "rails_helper"


RSpec.describe Post, type: :model do
  before(:each) do
    @user = build(:user)
    @user.save()

    user2 = build(:user)
    user2.save()

    @post = build(:post)
    @post.author = user2
    @post.save()
  end

  it "Create a post" do
    post = build(:post)
    post.author = @user
    post.save()

    expect(post).to be_valid
  end

  it "Throws an error if there is no author" do
    post = build(:post)
    post.save()
    expect(post).not_to be_valid

    expect(post.errors[:author]).to include("The post must have an author")
  end

  # it "Throws an error if a post has no photo" do
  #   @post.image_url = nil
  #   @post.save()
  #   expect(@post).not_to be_valid

  #   expect(@post.errors[:image_url]).to include("The post must have a photo URL")
  # end

  it "Throws an error if a caption exceeds 2200 characters" do
    @post.caption = "0" * 2200
    @post.save()
    expect(@post).to be_valid

    @post.caption = "0" * 2201
    @post.save()
    expect(@post).not_to be_valid

    expect(@post.errors[:caption]).to include("Post captions must under 2200 characters")
  end

  it "Throws an error if a post is tagged more than 30 times" do
    30.times {
      tagging = Tagging.new
      tagging.hashtag = build(:hashtag)
      @post.taggings << tagging
    }

    @post.save()
    expect(@post).to be_valid

    tagging = Tagging.new
    tagging.hashtag = build(:hashtag)
    @post.taggings << tagging

    @post.save()
    expect(@post).not_to be_valid

    expect(@post.errors[:max_taggings]).to include("A post can only be tagged a maximum of 30 times")
  end

end
