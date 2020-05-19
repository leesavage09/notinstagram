require "rails_helper"

RSpec.describe Tagging, type: :model do
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

    @post2 = build(:post)
    @post2.author = user3
    @post2.save()

    @hashtag = build(:hashtag)
    @hashtag.save()
  end

  it "can create a tagging" do
    tagging = Tagging.new
    tagging.hashtag = @hashtag
    tagging.post = @post
    tagging.save()

    taggingFound = Tagging.find_by(id: tagging.id)

    expect(tagging).to be_valid
    expect(taggingFound).to be_an_instance_of Tagging
  end

  it "There must be a hashtag" do
    tagging = Tagging.new
    tagging.post = @post
    tagging.save()

    expect(tagging).not_to be_valid
    expect(tagging.errors[:hashtag]).to include("There must be a hashtag.")
  end

  it "There must be a post" do
    tagging = Tagging.new
    tagging.hashtag = @hashtag
    tagging.save()

    expect(tagging).not_to be_valid
    expect(tagging.errors[:post]).to include("There must be a post.")
  end

  it "tagging is destroyed when the tagged post is destroyed" do
    tagging = Tagging.new
    tagging.hashtag = @hashtag
    tagging.post = @post
    tagging.save()
    expect(tagging).to be_valid

    tagging2 = Tagging.new
    tagging2.hashtag = @hashtag
    tagging2.post = @post2
    tagging2.save()
    expect(tagging2).to be_valid

    taggingFound = Tagging.find_by(id: tagging.id)
    expect(taggingFound).to be_an_instance_of Tagging

    @post2.destroy

    taggingFound = Tagging.find_by(id: tagging2.id)
    expect(taggingFound).to be_nil
  end

  it "all post hastag pairs must be unique" do
    tagging = Tagging.new
    tagging.hashtag = @hashtag
    tagging.post = @post
    tagging.save()
    expect(tagging).to be_valid

    tagging2 = Tagging.new
    tagging2.hashtag = @hashtag
    tagging2.post = @post
    tagging2.save()
    expect(tagging2).not_to be_valid
    expect(tagging2.errors[:post_id]).to include("A post can only be tagged ones with a hashtag.")
  end

  it "a post can only be tagged 30 times or less" do
    raise "TODO this and other unique checks"
  end
end
