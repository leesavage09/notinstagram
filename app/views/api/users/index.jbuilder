json.profiles do
    @users.each do |profile|
        json.set! profile.id do
            json.id profile.id
            json.name profile.name
            json.username profile.username
            json.bio profile.bio
        json.image_url profile.image_url
      end
    end
end