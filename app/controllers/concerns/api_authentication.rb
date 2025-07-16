module APIAuthentication
  extend ActiveSupport::Concern
  include Authentication

  private
    def request_authentication
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
end
