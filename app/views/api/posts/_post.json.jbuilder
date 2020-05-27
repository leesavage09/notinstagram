json.id post.id
json.author_id post.author_id
json.caption post.caption
json.image_url post.image_url
json.time_ago time_ago_in_words(post.created_at)
json.comment_ids post.comments.ids
json.liker_ids post.likes.pluck("liker_id")