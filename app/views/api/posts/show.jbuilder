json.post do
    json.partial! "api/posts/post", post: @post
end

json.partial! "api/comments/comments", comments: @post_comments

json.partial! "api/users/public_users", users: @associated_users