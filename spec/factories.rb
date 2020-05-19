FactoryBot.define do
    
    factory :user do
        name {Faker::Name.unique.name}
        username {Faker::Internet.unique.username}
        email {Faker::Internet.unique.email} 
        password {Faker::Internet.password}
    end


    factory :post do
        caption {Faker::Quote.famous_last_words}
    end
  
    factory :hashtag do
        name {Faker::Hipster.words}
    end

    factory :comment do
        body {Faker::Quote.yoda}
    end

end