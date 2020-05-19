require "rails_helper"

RSpec.describe User, type: :model do
  string_len_30 = "0" * 30
  string_len_31 = "0" * 31
  string_len_150 = "0" * 150
  string_len_151 = "0" * 151

  email_len_254 = ("0" * 242) + "@example.com"
  email_len_255 = ("0" * 243) + "@example.com"

  it "create and find user" do
    u = build(:user)
    u.save()
    u2 = User.find(u.id)

    expect(u == u2)
  end

  it "user name less than 30 char" do
    u = build(:user)
    u.name = string_len_30
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.name = string_len_31
    u.save()
    expect(u).not_to be_valid

    expect(u.errors[:name]).to include("Name must be less than 30 characters.")
  end

  it "name can be null" do
    u = build(:user)
    u.name = nil
    u.save()
    expect(u).to be_valid
  end

  it "username less than 30 char" do
    u = build(:user)
    u.username = string_len_30
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.username = string_len_31
    u.save()
    expect(u).not_to be_valid

    expect(u.errors[:username]).to include("Username must be less than 30 characters.")
  end

  it "Username can only use letters, numbers, underscores and periods" do
    u = build(:user)
    u.username = "test_username.99"
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.username = ":test@username"
    u.save()
    expect(u).not_to be_valid
    expect(u.errors[:username]).to include("Username can only use letters, numbers, underscores and periods")
  end

  it "bio can be null" do
    u = build(:user)
    u.bio = nil
    u.save()
    expect(u).to be_valid
  end

  it "bio less than 150 char" do
    u = build(:user)
    u.bio = string_len_150
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.bio = string_len_151
    u.save()
    expect(u).not_to be_valid

    expect(u.errors[:bio]).to include("Bio must be under 150 characters.")
  end

  it "email cant be blank" do
    u = build(:user)
    u.email = nil
    u.save()
    expect(u).not_to be_valid
  end

  it "email less than 254 chars" do
    u = build(:user)
    u.email = email_len_254
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.email = email_len_255
    u.save()
    expect(u).not_to be_valid

    expect(u.errors[:email]).to include("Email is not valid")
  end

  it "email address is valid" do
    u = build(:user)
    u.email = "good@address.com"
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.email = "badaddress.com"
    u.save()
    expect(u).not_to be_valid
  end

  it "username is unique" do
    u = build(:user)
    u.save()
    expect(u).to be_valid

    u2 = build(:user)
    u2.username = u.username
    u2.save()
    expect(u2).not_to be_valid

    expect(u2.errors[:username]).to include("This username has already been taken.")
  end

  it "email is unique" do
    u = build(:user)
    u.save()
    expect(u).to be_valid

    u2 = build(:user)
    u2.email = u.email
    u2.save()
    expect(u2).not_to be_valid

    expect(u2.errors[:email]).to include("Email address has already signed up")
  end
end
