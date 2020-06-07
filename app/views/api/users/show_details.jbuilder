json.user do
    json.partial! "api/users/user", user: @user
    
    json.number_posts @posts.length
    json.number_followers @user.followers.count
    json.number_following @user.followed_users.count
    json.post_ids @posts.ids
end

json.partial! "api/posts/posts", posts: @posts

json.partial! "api/comments/comments", comments: @post_comments

json.partial! "api/users/public_users", users: @associated_users