# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "net/http"
require "json"

@allPosts = []
@allUsers = []
@allHashtags = []
@allComments = []

def create_users
  url = "https://randomuser.me/api/?results=70&password=upper,lower,7-14&seed=notinsta&inc=name,email,login,picture"
  uri = URI(url)
  response = Net::HTTP.get(uri)
  jsonSeeds = JSON.parse(response)

  # create guest account
  user = User.new
  user.name = "Guest Account"
  user.username = "guest"
  user.email = "guest@example.com"
  user.password = "guestaccount"
  if user.save()
    @allUsers << user
  end

  jsonSeeds["results"].each { |data|
    user = User.new
    user.name = data["name"]["first"] + " " + data["name"]["last"]
    user.email = data["email"]
    user.username = data["login"]["username"]
    user.password = data["login"]["password"]
    user.image_url = data["picture"]["large"]
    if user.save()
      @allUsers << user
    end
  }
end

def tag_post(hashtags, post)
  hashtags.each { |hashtag|
    tagging = Tagging.new
    tagging.hashtag = hashtag
    tagging.post = post
    tagging.save!()
  }
end

def create_notification(user, message, activity)
  note = Notification.new
  note.notified_user = user
  note.message = message
  note.activity = activity
  note.save!()
end

def create_hashtags
  Faker::Hipster.unique.words(number: 30).each do |word|
    hashtag = Hashtag.new
    hashtag.name = "#" + word
    @allHashtags << hashtag if hashtag.save()
  end
end

def create_posts
  num = 10 #range = 10..992
  @allUsers.each { |user|
    rand(3..5).times do
      hashtags = @allHashtags.sample(rand(2..7))
      post = FactoryBot.build(:post)
      post.author = user
      hashtags.each { |hashtag|
        post.caption << " " + hashtag.name
      }
      tag_post(hashtags, post)
      post.image_url = "photo-seeds/#{num}.jpg"
      num = num + 1
      if post.save()
        @allPosts << post
      end
    end
  }
end

create_hashtags
create_users
create_posts

# comment
@allUsers.each { |user|
  #comment on posts
  @allPosts.sample(rand(1..4)).each { |post| #1..4
    comment = FactoryBot.build(:comment)
    comment.author = user
    comment.parent = post
    comment.parent_post = post

    if comment.save()
      @allComments << comment
      create_notification(user, Notification::COMMENTED_POST, comment)
    end
  }

  #reply to comments
  @allComments.sample(rand(0..1)).each { |parentComment|
    comment = FactoryBot.build(:comment)
    comment.author = user
    comment.parent = parentComment
    comment.parent_post = parentComment.parent_post

    if comment.save()
      @allComments << comment
      create_notification(user, Notification::REPLIED_COMMENTED, comment)
    end
  }
}

#follows
@allUsers.each { |user|
  @allUsers.sample(rand(5..15)).each { |other_user|
    follow = Follow.new
    follow.follower = user
    follow.followed = other_user
    if follow.save()
      create_notification(other_user, Notification::STARTED_FOLLOWING, follow)
    end
  }

  @allHashtags.sample(rand(0..1)).each { |hashtag|
    follow = Follow.new
    follow.follower = user
    follow.followed = hashtag
    follow.save!()
  }
}

#likes
@allUsers.each { |user|
  @allComments.sample(rand(0..1)).each { |comment|
    like = Like.new
    like.liker = user
    like.liked = comment
    if like.save()
      create_notification(comment.author, Notification::LIKED_COMMENT, like)
    end
  }

  @allPosts.sample(rand(20..40)).each { |post|
    like = Like.new
    like.liker = user
    like.liked = post
    if like.save()
      create_notification(post.author, Notification::LIKED_POST, like)
    end
  }
}
