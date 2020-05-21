require "rails_helper"

RSpec.describe Hashtag, type: :model do
  it "Create a hashtag" do
    hashtag = build(:hashtag)
    hashtag.save()
    expect(hashtag).to be_valid
    hashtagFound = Hashtag.find(hashtag.id)

    expect(hashtag == hashtagFound)
  end

  it "Search for a hashtag by name" do
    hashtag = build(:hashtag)
    hashtag.save()
    expect(hashtag).to be_valid
    searchName = hashtag.name

    hashtagFound = Hashtag.find_by(name: searchName)

    expect(hashtag == hashtagFound)
  end

  it "Throws an error if there is no name" do
    hashtag = build(:hashtag)
    hashtag.name = nil
    hashtag.save()

    expect(hashtag).not_to be_valid
    expect(hashtag.errors[:name]).to include("The hashtag must have a name")
  end

  it "Throws an error if name is in the wrong format" do   
    hashtag = build(:hashtag)
    hashtag.name = "#tshirt"
    hashtag.save()
    expect(hashtag).to be_valid

    hashtag2 = build(:hashtag)
    hashtag2.name = "n-=3£il"
    hashtag2.save()

    expect(hashtag2).not_to be_valid
    expect(hashtag2.errors[:name]).to include("Hashtag names must start with a # and can only use letters, numbers and emojis")
  end

  it "Throws an error if name is over 30 characters" do
    hashtag = build(:hashtag)
    hashtag.name =  '#'+("v" * 29)
    hashtag.save()
    expect(hashtag).to be_valid

    hashtag2 = build(:hashtag)
    hashtag2.name = '#'+("v" * 30)
    hashtag2.save()

    expect(hashtag2).not_to be_valid
    expect(hashtag2.errors[:name]).to include("Hashtag name must be less than 30 characters")
  end

  it "Throws an error if the name already exists" do
    hashtag = build(:hashtag)
    hashtag.name =  '#hashtag'
    hashtag.save()
    expect(hashtag).to be_valid

    hashtag2 = build(:hashtag)
    hashtag2.name = '#hashtag'
    hashtag2.save()

    expect(hashtag2).not_to be_valid
    expect(hashtag2.errors[:name]).to include("Hashtag name must be unique")
  end

end
