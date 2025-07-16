require "test_helper"

class Api::PhotosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    @photo = photos(:one)
  end

  test "should get index when authenticated" do
    sign_in(@user)
    get api_photos_path
    assert_response :success

    json_response = JSON.parse(response.body)
    assert_kind_of Array, json_response

    photos = json_response
    assert_equal photos.length, 2
    photo = photos.last # it is ordered by created_at desc
    assert_equal photo["id"], @photo.id
  end

  test "should include liked_by_current_user field" do
    sign_in(@user)
    get api_photos_path
    assert_response :success

    json_response = JSON.parse(response.body)
    if json_response.any?
      photo = json_response.first
      assert_includes photo.keys, "liked_by_current_user"
      assert_includes [ true, false ], photo["liked_by_current_user"]
    end
  end

  test "should return correct likes_count" do
    sign_in(@user)
    get api_photos_path
    assert_response :success

    json_response = JSON.parse(response.body)
    if json_response.any?
      photo = json_response.first
      assert_includes photo.keys, "likes_count"
      assert_kind_of Integer, photo["likes_count"]
      assert_operator photo["likes_count"], :>=, 0
    end
  end

  test "should return unauthorized for unauthenticated requests" do
    get api_photos_path
    assert_response :unauthorized
  end
end
