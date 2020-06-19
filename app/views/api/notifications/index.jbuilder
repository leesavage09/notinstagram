json.notifications do
    json.id do
        @notes.each do |note|
            json.set! note.id do
                json.partial! "api/notifications/notification", note: note
            end
        end
    end
end

json.partial! "api/users/public_users", users: @source_users

json.partial! "api/posts/posts", posts: @source_posts