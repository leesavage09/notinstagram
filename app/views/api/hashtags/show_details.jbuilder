json.hashtag do
    json.partial! "api/hashtags/hashtag", hashtag: @hashtag
    
    json.number_posts @number_posts
    json.post_ids @post_ids
end

json.partial! "api/posts/posts", posts: @posts

json.partial! "api/comments/comments", comments: @post_comments

json.partial! "api/users/public_users", users: @associated_users