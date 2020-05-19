require "rails_helper"

def createUser
  user = build(:user)
  user.save()
  user
end

RSpec.describe Follow, type: :model do
  it "follow a user" do
    follow = Follow.create({
      follower: createUser,
      followed: createUser,
    })

    expect(follow).to be_valid
  end

  it "follow a hastag" do
    follow = Follow.create({
      follower: createUser,
      followed: build(:hashtag),
    })

    expect(follow).to be_valid
  end

  it "must follow somthing (user or hastag)" do
    follow = Follow.create({
      follower: createUser,
      followed: nil,
    })

    expect(follow).not_to be_valid
    expect(follow.errors[:followed]).to include("Something must be followed.")
  end

  it "there must be a follower" do
    follow = Follow.create({
      follower: nil,
      followed: createUser,
    })

    expect(follow).not_to be_valid
    expect(follow.errors[:follower]).to include("There must be a follower.")
  end

end
