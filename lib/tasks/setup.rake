desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["populate_with_sample_data"].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  create_sample_data!
  puts "sample data has been added."
end

def create_sample_data!
  puts "Seeding with sample data..."
  User.create!(
    email: "sam@example.com", first_name: "Sam", last_name: "Smith",
    role: "administrator", password: "welcome", password_confirmation: "welcome"
  )
  puts 'Done! Now you can log in with "sam@example.com", using password "welcome"'
end
