# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


100.times do
    u = FactoryBot.build(:user)
    u.save()
end

User.create({
    name: "Guest Account",
    username: "guest",
    email: "guest@example.com",
    password: "guestaccount"
})