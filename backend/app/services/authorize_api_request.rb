class AuthorizeApiRequest
  def initialize(headers = {})
    @headers = headers
  end

  def call
    {
      user: user
    }
  end

  private

  attr_reader :headers

  def user
    @user ||= User.find(decoded_token[:user_id]) if decoded_token
  end

  def decoded_token
    @decoded_token ||= JsonWebToken.jwt_decode(http_auth_header)
  end

  def http_auth_header
    if headers["Authorization"].present?
      return headers["Authorization"].split(" ").last
    end

    raise(ExceptionHandler::MissingToken, "Missing token")
  end
end
