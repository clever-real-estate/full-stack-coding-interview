class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: { error: e.message }, status: :not_found
  end

  rescue_from ExceptionHandler::MissingToken do |e|
    render json: { error: e.message }, status: :unauthorized
  end

  rescue_from ExceptionHandler::InvalidToken do |e|
    render json: { error: e.message }, status: :unauthorized
  end

  before_action :authenticate_request

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.new(request.headers).call[:user]
    render json: { error: "Not Authorized" }, status: :unauthorized unless @current_user
  end
end
