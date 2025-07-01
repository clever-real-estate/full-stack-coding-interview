require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should be valid with all attributes" do
    user = User.new(name: 'Test', email: 'test@example.com', password: 'password')
    assert user.valid?
  end

  test "should not save user without email" do
    user = User.new(name: 'Test', password: 'password')
    assert_not user.valid?, "Saved the user without an email"
    assert_not_nil user.errors[:email], "No validation error for email present"
  end

  test "should not save user without name" do
    user = User.new(email: 'test@example.com', password: 'password')
    assert_not user.valid?
    assert_not_nil user.errors[:name]
  end

  test "should not save user with duplicate email" do
    User.create!(name: 'Test', email: 'test@example.com', password: 'password')
    duplicate_user = User.new(name: 'Another Test', email: 'test@example.com', password: 'password')
    assert_not duplicate_user.valid?
  end

  test "should not save user with password shorter than 6 characters" do
    user = User.new(name: 'Test', email: 'test@example.com', password: '123')
    assert_not user.valid?
  end
end
