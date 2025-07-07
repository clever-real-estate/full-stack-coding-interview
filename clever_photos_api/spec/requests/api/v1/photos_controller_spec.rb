require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe "Api::V1::Photos", type: :request do
  let!(:user) { create(:user) }
  let!(:photos) { create_list(:photo, 5) }

  describe "GET /index" do
    context "with valid authentication" do
      before do
        headers = { 'Accept' => 'application/json' }
        auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)

        get api_v1_photos_path, headers: auth_headers
      end

      it "returns a successful response" do
        expect(response).to have_http_status(:ok)
      end

      it "returns a list of photos" do
        json_response = JSON.parse(response.body)

        expect(json_response.size).to eq(5)
      end

      it "includes the photographer's details for each photo" do
        json_response = JSON.parse(response.body)
        first_photo = json_response.first

        expect(first_photo['photographer']).to be_present
        expect(first_photo['photographer']['name']).to eq(photos.first.photographer.name)
      end
    end

    context "without valid authentication" do
      before do
        get api_v1_photos_path
      end

      it "returns an unauthorized response" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
