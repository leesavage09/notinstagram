json.post_ids @post_ids

json.partial! "api/posts/posts", posts: @posts

json.partial! "api/comments/comments", comments: @post_comments

json.partial! "api/users/public_users", users: @associated_users