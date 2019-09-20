10.times do 

  u = User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    bday: Faker::Date.birthday(min_age: 18, max_age: 65)
  )

  10.times do
    Pet.create(
      name: Faker::Creature::Dog.name,
      species: Faker::Creature::Animal.name,
      user_id: u.id
    )

  end
end