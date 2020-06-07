require "rails_helper"

RSpec.describe Follow, type: :model do
  before(:each) do
    @user1 = build(:user)
    @user1.save()

    @user2 = build(:user)
    @user2.save()
  end

  it "Follow a user" do
    follow = Follow.create({
      follower: @user1,
      followed: @user2,
    })

    expect(follow).to be_valid
  end

  it "Follow a hastag" do
    follow = Follow.create({
      follower: @user1,
      followed: build(:hashtag),
    })

    expect(follow).to be_valid
  end

  it "Throws an error if nothing is being followed" do
    follow = Follow.create({
      follower: @user1,
      followed: nil,
    })

    expect(follow).not_to be_valid
    expect(follow.errors[:followed]).to include("Something must be followed")
  end

  it "Throws an error if there is no follower" do
    follow = Follow.create({
      follower: nil,
      followed: @user1,
    })

    expect(follow).not_to be_valid
    expect(follow.errors[:follower]).to include("There must be a follower")
  end

  it "Throws an error if the same thing is followed again" do
    follow = Follow.create({
      follower: @user1,
      followed: @user2,
    })
    expect(follow).to be_valid

    follow2 = Follow.create({
      follower: @user1,
      followed: @user2,
    })
    expect(follow2).not_to be_valid
    expect(follow2.errors[:follower]).to include("User is already following this")
  end

end
