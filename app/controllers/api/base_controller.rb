class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token

  private

  def request_authentication
    render json: { error: "Authentication required" }, status: :unauthorized
  end
end
