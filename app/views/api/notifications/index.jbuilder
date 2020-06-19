json.notifications do
    @notes.each do |note|
        json.set! note.id do
            json.partial! "api/notifications/notification", note: note
        end
    end
end

json.partial! "api/users/public_users", users: @users

json.partial! "api/posts/posts", posts: @posts

json.partial! "api/comments/comments", comments: @comments