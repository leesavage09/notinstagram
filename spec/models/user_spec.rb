require "rails_helper"

RSpec.describe User, type: :model do
  before(:all) do
    @string_len_30 = "0" * 30
    @string_len_31 = "0" * 31
    @string_len_150 = "0" * 150
    @string_len_151 = "0" * 151

    @email_len_254 = ("0" * 242) + "@example.com"
    @email_len_255 = ("0" * 243) + "@example.com"
  end

  it "Create a user" do
    user = build(:user)
    user.save()
    foundUser = User.find(user.id)

    expect(user).to be_valid
    expect(user == foundUser)
  end

  it "Search for a user by username and name" do
    user = build(:user)
    user.save()
    expect(user).to be_valid

    username = user.username
    password = user.password

    foundUser = User.find_by_credentials(username, password)
    expect(user == foundUser)
  end

  it "Name can be null" do
    user = build(:user)
    user.name = nil
    user.save()
    expect(user).to be_valid
  end

  it "Bio can be null" do
    user = build(:user)
    user.bio = nil
    user.save()
    expect(user).to be_valid
  end

  it "Throws an error if Username is nil" do
    user = build(:user)
    user.username = nil
    user.save()
    expect(user).not_to be_valid

    expect(user.errors[:username]).to include("You must choose a username")
  end

  it "Throws an error if email is nil" do
    user = build(:user)
    user.email = nil
    user.save()
    expect(user).not_to be_valid
    expect(user.errors[:email]).to include("You must have an email address")
  end

  it "Throws an error if username is more than 30 characters" do
    user = build(:user)
    user.username = @string_len_30
    user.save()
    expect(user).to be_valid

    user = build(:user)
    user.username = @string_len_31
    user.save()
    expect(user).not_to be_valid

    expect(user.errors[:username]).to include("Username must be less than 30 characters")
  end

  it "Throws an error if name is more than 30 characters" do
    user = build(:user)
    user.name = @string_len_30
    user.save()
    expect(user).to be_valid

    user = build(:user)
    user.name = @string_len_31
    user.save()
    expect(user).not_to be_valid

    expect(user.errors[:name]).to include("Name must be less than 30 characters")
  end

  it "Throws an error if Bio is more than 150 characters" do
    user = build(:user)
    user.bio = @string_len_150
    user.save()
    expect(user).to be_valid

    user = build(:user)
    user.bio = @string_len_151
    user.save()
    expect(user).not_to be_valid

    expect(user.errors[:bio]).to include("Bio must be under 150 characters")
  end

  it "Throws an error if Password is less than 6 characters" do
    user = build(:user)
    user.password = "12345"
    user.save()
    
    expect(user).not_to be_valid
    expect(user.errors[:password]).to include("Password must be at least 6 characters long")
  end

  it "Throws an error if email is more than 254 characters" do
    user = build(:user)
    user.email = @email_len_254
    user.save()
    expect(user).to be_valid

    user = build(:user)
    user.email = @email_len_255
    user.save()
    expect(user).not_to be_valid

    expect(user.errors[:email]).to include("Email is not in a valid format")
  end

  it "Throws an error if email address is not a valid address" do
    user = build(:user)
    user.email = "good@address.com"
    user.save()
    expect(user).to be_valid

    user = build(:user)
    user.email = "badaddress.com"
    user.save()
    expect(user).not_to be_valid

    expect(user.errors[:email]).to include("Email is not in a valid format")
  end

  it "Throws an error if username has invalid characters" do
    user = build(:user)
    user.username = "test_username.99"
    user.save()
    expect(user).to be_valid

    user = build(:user)
    user.username = ":test@username"
    user.save()
    expect(user).not_to be_valid
    expect(user.errors[:username]).to include("Username can only use letters, numbers, underscores and periods")
  end

  it "Throws an error if the username already exists" do
    user = build(:user)
    user.save()
    expect(user).to be_valid

    user2 = build(:user)
    user2.username = user.username
    user2.save()
    expect(user2).not_to be_valid

    expect(user2.errors[:username]).to include("This username has already been taken")
  end

  it "Throws an error if email is already in use" do
    user = build(:user)
    user.save()
    expect(user).to be_valid

    user2 = build(:user)
    user2.email = user.email
    user2.save()
    expect(user2).not_to be_valid

    expect(user2.errors[:email]).to include("Email address has already signed up")
  end
end
