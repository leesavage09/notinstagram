require "rails_helper"

RSpec.describe Comment, type: :model do
  before(:each) do
    @user1 = build(:user)
    @user1.save()

    @user2 = build(:user)
    @user2.save()

    user3 = build(:user)
    user3.save()

    @post = build(:post)
    @post.author = user3
    @post.save()
  end

  it "Comment on a post" do
    comment1 = build(:comment)
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()

    commentFound = Comment.find_by(id: comment1.id)

    expect(comment1).to be_valid
    expect(commentFound).to be_an_instance_of Comment
  end

  it "Comment on a comment" do
    comment1 = build(:comment)
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()

    comment2 = build(:comment)
    comment2.author = @user2
    comment2.parent = comment1
    comment2.parent_post_id = @post.id
    comment2.save()

    expect(comment1).to be_valid
    expect(comment2).to be_valid
  end

  it "Deleting a post also deletes its comments" do
    comment1 = build(:comment)
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()

    commentFound = Comment.find_by(id: comment1.id)
    expect(commentFound).to be_an_instance_of Comment

    @post.destroy

    commentFound = Comment.find_by(id: comment1.id)
    expect(commentFound).to be_nil
  end

  it "Deleting a comment also deletes its sub comments" do
    comment1 = build(:comment)
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()
    expect(comment1).to be_valid

    comment2 = build(:comment)
    comment2.author = @user2
    comment2.parent = comment1
    comment2.parent_post_id = @post.id
    comment2.save()
    expect(comment2).to be_valid

    commentFound = Comment.find_by(id: comment2.id)
    expect(commentFound).to be_an_instance_of Comment

    comment1.destroy

    commentFound = Comment.find_by(id: comment2.id)
    expect(commentFound).to be_nil
  end

  it "Throws an error if the comment has no body" do
    comment1 = build(:comment)
    comment1.body = nil
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()

    expect(comment1).not_to be_valid
    expect(comment1.errors[:body]).to include("The comment must have a body")
  end

  it "Throws an error if the comment has no author" do
    comment1 = build(:comment)
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()

    expect(comment1).to be_valid
    
    comment2 = build(:comment)
    comment2.author = nil
    comment2.parent = @post
    comment2.parent_post_id = @post.id
    comment2.save()

    expect(comment2).not_to be_valid
    expect(comment2.errors[:author]).to include("The comment must have an author")
  end

  it "Throws an error when the comment has no parent" do
    comment1 = build(:comment)
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()

    expect(comment1).to be_valid
    
    comment2 = build(:comment)
    comment2.author = @user1
    comment2.parent = nil
    comment2.parent_post_id = @post.id
    comment2.save()

    expect(comment2).not_to be_valid
    expect(comment2.errors[:parent]).to include("The comment must have a parent")
  end

  it "Throws an error if the comment body has more than 2200 character" do
    comment1 = build(:comment)
    comment1.body = "0" * 2200
    comment1.author = @user1
    comment1.parent = @post
    comment1.parent_post_id = @post.id
    comment1.save()

    expect(comment1).to be_valid
    
    comment2 = build(:comment)
    comment2.body = "0" * 2201
    comment2.author = @user1
    comment2.parent = @post
    comment2.parent_post_id = @post.id
    comment2.save()

    expect(comment2).not_to be_valid
    expect(comment2.errors[:body]).to include("Comment body must be less than 2200 characters")
  end

  it "Throws an error if parent_post_id is null" do
    comment1 = build(:comment)
    comment1.body = "0" * 2200
    comment1.author = @user1
    comment1.parent = @post
    # comment1.parent_post_id = null
    comment1.save()

    expect(comment1).not_to be_valid
    expect(comment1.errors[:parent_post]).to include("The comment must have a parent_post_id")
  end
end
