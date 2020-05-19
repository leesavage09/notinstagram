require "rails_helper"

RSpec.describe Hashtag, type: :model do
  it "can create a hashtag" do
    hashtag = build(:hashtag)
    hashtag.save()
    hashtag2 = Hashtag.find(hashtag.id)

    expect(hashtag == hashtag2)
  end

  it "the hastag must have a name" do
    hashtag = build(:hashtag)
    hashtag.name = nil
    hashtag.save()

    expect(hashtag).not_to be_valid
    expect(hashtag.errors[:name]).to include("The hashtag must have a name.")
  end
end
