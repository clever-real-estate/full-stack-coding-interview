require 'rails_helper'
require 'devise/jwt/test_helpers'

RSpec.describe Api::V1::SessionsController, type: :request do
  let!(:user) { create(:user) }

  describe "POST /api/v1/sessions" do
    it "returns a successful response" do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      expect(response).to have_http_status(:ok)
    end

    it "returns the user's JWT token" do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      expect(response.headers['Authorization']).to be_present
    end

    it "returns the user's email" do
      post user_session_path, params: { user: { email: user.email, password: user.password } }
      expect(response.body).to include(user.email)
    end

    context "with invalid credentials" do
      it "returns an unauthorized response" do
        post user_session_path, params: { user: { email: user.email, password: 'wrong_password' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
