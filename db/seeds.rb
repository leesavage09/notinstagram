# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

@allPosts = []
@allUsers = []
@allHashtags = []
@allComments = []

def tag_post(post)
  @allHashtags.sample(4).each { |hashtag|
    tagging = Tagging.new
    tagging.hashtag = hashtag
    tagging.post = post
    tagging.save()
  }
end

def create_notification(user, message, activity)
  note = Notification.new
  note.notified_user = user
  note.message = message
  note.activity = activity
  note.save()
end

# create guest account
user = User.new
user.name = "Guest Account"
user.username = "guest"
user.email = "guest@example.com"
user.password = "guestaccount"
user.save()
@allUsers << user if user.valid?

#create hastags
30.times do
  hashtag = FactoryBot.build(:hashtag)
  hashtag.save()
  @allHashtags << hashtag
end

#create users
15.times do
  user = FactoryBot.build(:user)
  user.save()
  @allUsers << user
end

#create posts
@allUsers.each { |user|
  8.times do
    post = FactoryBot.build(:post)
    post.author = user
    tag_post(post)

    post.save()
    @allPosts << post
  end
}

# comment
@allUsers.each { |user|
  #comment on posts
  @allPosts.sample(5).each { |post|
    comment = FactoryBot.build(:comment)
    comment.author = user
    comment.parent = post
    comment.save()

    @allComments << comment

    create_notification(user, Notification::COMMENTED_POST, comment)
  }

  #reply to comments
  @allComments.sample(5).each { |parentComment|
    comment = FactoryBot.build(:comment)
    comment.author = user
    comment.parent = parentComment
    comment.save()

    @allComments << comment

    create_notification(user, Notification::REPLIED_COMMENTED, comment)
  }
}

#follows
@allUsers.each { |user1|
  @allUsers.sample(10) { |user2|
    follow = Follow.new
    follow.follower = user1
    follow.followed = user2
    follow.save()

    create_notification(user2, Notification::STARTED_FOLLOWING, follow)
  }
}

#likes
@allUsers.each { |user|
  @allComments.sample(15).each { |comment|
    like = Like.new
    like.liker = user
    like.liked = comment
    like.save()

    create_notification(comment.author, Notification::LIKED_COMMENT, like)
  }

  @allPosts.sample(15).each { |post|
    like = Like.new
    like.liker = user
    like.liked = post
    like.save()

    create_notification(post.author, Notification::LIKED_POST, like)
  }
}
