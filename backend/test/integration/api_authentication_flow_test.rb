require "test_helper"

class ApiAuthenticationFlowTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(name: 'Test', email: 'test@example.com', password: 'password')
  end

  test "should get a JWT token with valid credentials" do
    post api_v1_authenticate_url, params: { email: 'test@example.com', password: 'password' }
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_not_nil json_response['token']
  end

  test "should not get a JWT token with invalid credentials" do
    post api_v1_authenticate_url, params: { email: 'test@example.com', password: 'wrongpassword' }
    assert_response :unauthorized
  end

  test "should not get photos without a token" do
    get api_v1_photos_url
    assert_response :unauthorized
  end

  test "should get photos with a valid token" do
    post api_v1_authenticate_url, params: { email: 'test@example.com', password: 'password' }
    token = JSON.parse(response.body)['token']

    get api_v1_photos_url, headers: { 'Authorization': "Bearer #{token}" }
    assert_response :success
  end
end
