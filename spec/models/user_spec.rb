require 'rails_helper'


RSpec.describe User, type: :model do

  string_len_30 = '123456789012345678901234567890'
  string_len_31 = '123456789012345678901234567890A'
  string_len_150 = 'faslkjfas askfnaslkjflasj aslfjasldjsalkjdla jdjasldkjsalkdj alj dasljdlasj dlkasjdlkja sld asldjsalkj dla jdlkjas lkdj aslkdj lasjdlkasjdla sldk ajld'
  string_len_151 = 'faslkjfas askfnaslkjflasj aslfjasldjsalkjdla jdjasldkjsalkdj alj dasljdlasj dlkasjdlkja sld asldjsalkj dla jdlkjas lkdj aslkdj lasjdlkasjdla sldk ajldA'
  string_len_254 = 'tessssssssssssssssssssssssssssssssssssssttessssssssssssssssssssssssssssssssssssssttessssssssssssssssssssssssssssssssssssssttessssssssstesssssssssssssssssssssssssssssssssssssstsssssssssssssssssssssstessssssssssssssssssssssssssssssssssssstssssssst@test.com'
  string_len_255 = 'tessssssssssssssssssssssssssssssssssssssttessssssssssssssssssssssssssssssssssssssttessssssssssssssssssssssssssssssssssssssttessssssssstesssssssssssssssssssssssssssssssssssssstsssssssssssssssssssssstessssssssssssssssssssssssssssssssssssstssssssst@test.coma'
  valid_username = 'Test_1.2'

  it 'create and find user' do
    u = build(:user)
    u.save()
    u2 =  User.find(u.id)
    
    expect(u == u2)
  end

  it 'user name less than 30 char' do
    u = build(:user)
    u.name = string_len_30
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.name = string_len_31
    u.save()
    expect(u).not_to be_valid

    expect(u.errors[:name]).to include('is too long (maximum is 30 characters)')
  end

  it 'name can be null' do 
    u = build(:user)
    u.name = nil
    u.save()
    expect(u).to be_valid
  end

  it 'username less than 30 char' do
    u = build(:user)
    u.username = string_len_30
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.username = string_len_31
    u.save()
    expect(u).not_to be_valid

    expect(u.errors[:username]).to include('is too long (maximum is 30 characters)')
  end

  it 'Usernames can only use letters, numbers, underscores and periods' do
    u = build(:user)
    u.username = valid_username
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.username = valid_username.concat(': @\ ') 
    u.save()
    expect(u).not_to be_valid
    expect(u.errors[:username]).to include('Usernames can only use letters, numbers, underscores and periods')
  end

  it 'bio can be null' do 
    u = build(:user)
    u.bio = nil
    u.save()
    expect(u).to be_valid
  end

  it 'bio less than 150 char' do
    u = build(:user)
    u.bio = string_len_150
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.bio = string_len_151
    u.save()
    expect(u).not_to be_valid

    expect(u.errors[:bio]).to include('is too long (maximum is 150 characters)')
  end

  it 'email cant be blank' do
    u = build(:user)
    u.email = nil
    u.save()
    expect(u).not_to be_valid
  end

  it 'email less than 254 chars' do
    u = build(:user)
    u.email = string_len_254
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.email = string_len_255
    u.save()
    expect(u).not_to be_valid
   
    expect(u.errors[:email]).to include('is too long (maximum is 254 characters)')
  end

  it 'email address is valid' do
    u = build(:user)
    u.email = 'good@address.com'
    u.save()
    expect(u).to be_valid

    u = build(:user)
    u.email = 'badaddress.com'
    u.save()
    expect(u).not_to be_valid
  end

  it 'username is unique' do
    u = build(:user)
    u.save()
    expect(u).to be_valid

    u2 = build(:user)
    u2.username = u.username
    u2.save()
    expect(u2).not_to be_valid

    expect(u2.errors[:username]).to include('has already been taken')
  end

  it 'email is unique' do
    u = build(:user)
    u.save()
    expect(u).to be_valid

    u2 = build(:user)
    u2.email = u.email
    u2.save()
    expect(u2).not_to be_valid

    expect(u2.errors[:email]).to include('has already been taken')
  end

end
