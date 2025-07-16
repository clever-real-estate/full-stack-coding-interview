require "test_helper"

class Api::LikesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @photo = photos(:one)
    @other_user = users(:two)
    @other_photo = photos(:two)
  end

  # CREATE action tests
  test "should create like when authenticated" do
    sign_in(@user)
    assert_difference("Like.count") do
      post api_photo_like_path(@photo)
    end
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal true, json_response["success"]
    assert_includes json_response.keys, "likes_count"
    assert_equal true, json_response["liked_by_current_user"]
  end

  test "should not create duplicate like" do
    sign_in(@user)
    # Create first like
    post api_photo_like_path(@photo)
    assert_response :success

    # Try to create duplicate like
    assert_no_difference("Like.count") do
      post api_photo_like_path(@photo)
    end
    assert_response :unprocessable_entity

    json_response = JSON.parse(response.body)
    assert_equal false, json_response["success"]
    assert_includes json_response["error"], "already liked this photo"
  end

  test "should return unauthorized when creating like without authentication" do
    post api_photo_like_path(@photo)
    assert_response :unauthorized
  end

  test "should return not found when photo does not exist" do
    sign_in(@user)
    post api_photo_like_path(99999)
    assert_response :not_found
  end

  test "should update photo likes_count when like is created" do
    sign_in(@user)
    @photo.reload
    original_likes_count = @photo.likes_count

    post api_photo_like_path(@photo)
    assert_response :success

    @photo.reload
    assert_equal original_likes_count + 1, @photo.likes_count

    json_response = JSON.parse(response.body)
    assert_equal @photo.likes_count, json_response["likes_count"]
  end

  # DESTROY action tests
  test "should destroy like when authenticated" do
    sign_in(@user)
    post api_photo_like_path(@photo)
    assert_response :success

    # Then destroy it
    assert_difference("Like.count", -1) do
      delete api_photo_like_path(@photo)
    end
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal true, json_response["success"]
    assert_includes json_response.keys, "likes_count"
    assert_equal false, json_response["liked_by_current_user"]
  end

  test "should return not found when destroying non-existent like" do
    sign_in(@user)
    # Don't create a like first, try to destroy one that doesn't exist
    delete api_photo_like_path(@photo)
    assert_response :not_found

    json_response = JSON.parse(response.body)
    assert_equal false, json_response["success"]
    assert_equal "Like not found", json_response["error"]
  end

  test "should return unauthorized when destroying like without authentication" do
    delete api_photo_like_path(@photo)
    assert_response :unauthorized
  end

  test "should return not found when photo does not exist for destroy" do
    sign_in(@user)
    delete api_photo_like_path(99999)
    assert_response :not_found
    json_response = JSON.parse(response.body)
    assert_equal false, json_response["success"]
    assert_equal "Photo not found", json_response["error"]
  end

  test "should update photo likes_count when like is destroyed" do
    sign_in(@user)
    # First create a like
    post api_photo_like_path(@photo)
    assert_response :success
    @photo.reload
    likes_count_after_create = @photo.likes_count

    # Then destroy it
    delete api_photo_like_path(@photo)
    assert_response :success

    @photo.reload
    assert_equal likes_count_after_create - 1, @photo.likes_count

    json_response = JSON.parse(response.body)
    assert_equal @photo.likes_count, json_response["likes_count"]
  end

  test "should not allow user to destroy another user's like" do
    # Create a like for user one
    sign_in(@user)
    post api_photo_like_path(@photo)
    assert_response :success

    # Try to destroy it as user two
    sign_in(@other_user)
    delete api_photo_like_path(@photo)
    assert_response :not_found

    json_response = JSON.parse(response.body)
    assert_equal false, json_response["success"]
    assert_equal "Like not found", json_response["error"]
  end

  # Response structure tests
  test "create response should have correct structure" do
    sign_in(@user)
    post api_photo_like_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_includes json_response.keys, "success"
    assert_includes json_response.keys, "likes_count"
    assert_includes json_response.keys, "liked_by_current_user"
    assert_includes [ true, false ], json_response["success"]
    assert_kind_of Integer, json_response["likes_count"]
    assert_includes [ true, false ], json_response["liked_by_current_user"]
  end

  test "destroy response should have correct structure" do
    sign_in(@user)
    # Create a like first
    post api_photo_like_path(@photo)
    assert_response :success

    # Then destroy it
    delete api_photo_like_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_includes json_response.keys, "success"
    assert_includes json_response.keys, "likes_count"
    assert_includes json_response.keys, "liked_by_current_user"
    assert_includes [ true, false ], json_response["success"]
    assert_kind_of Integer, json_response["likes_count"]
    assert_includes [ true, false ], json_response["liked_by_current_user"]
  end

  test "error response should have correct structure" do
    sign_in(@user)
    # Try to create duplicate like
    post api_photo_like_path(@photo)
    assert_response :success

    post api_photo_like_path(@photo)
    assert_response :unprocessable_entity

    json_response = JSON.parse(response.body)
    assert_equal false, json_response["success"]
    assert_kind_of String, json_response["error"]
  end

  # LIKED action tests
  test "should return liked status when authenticated" do
    sign_in(@user)
    get api_photo_liked_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_includes json_response.keys, "liked"
    assert_includes [ true, false ], json_response["liked"]
  end

  test "should return false when photo is not liked" do
    sign_in(@user)
    get api_photo_liked_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal false, json_response["liked"]
  end

  test "should return true when photo is liked" do
    sign_in(@user)
    # Create a like first
    post api_photo_like_path(@photo)
    assert_response :success

    get api_photo_liked_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal true, json_response["liked"]
  end

  test "should return unauthorized when checking liked without authentication" do
    get api_photo_liked_path(@photo)
    assert_response :unauthorized
  end

  test "should return not found when photo does not exist for liked" do
    sign_in(@user)
    get api_photo_liked_path(99999)
    assert_response :not_found
  end

  # COUNT action tests
  test "should return likes count when authenticated" do
    sign_in(@user)
    get api_photo_likes_count_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_includes json_response.keys, "count"
    assert_kind_of Integer, json_response["count"]
  end

  test "should return zero count when no likes" do
    sign_in(@user)
    get api_photo_likes_count_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal 0, json_response["count"]
  end

  test "should return correct count when likes exist" do
    sign_in(@user)
    # Create a like first
    post api_photo_like_path(@photo)
    assert_response :success

    get api_photo_likes_count_path(@photo)
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_equal 1, json_response["count"]
  end

  test "should return unauthorized when checking count without authentication" do
    get api_photo_likes_count_path(@photo)
    assert_response :unauthorized
  end

  test "should return not found when photo does not exist for count" do
    sign_in(@user)
    get api_photo_likes_count_path(99999)
    assert_response :not_found
  end
end
