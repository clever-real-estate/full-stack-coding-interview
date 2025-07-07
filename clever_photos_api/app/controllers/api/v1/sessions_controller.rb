class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json

  before_action :configure_sign_in_params, only: [ :create ]

  def create
    self.resource = warden.authenticate!(auth_options)

    sign_in(resource_name, resource)

    render json: {
      status: { code: 200, message: "Signed in successfully." },
      user: UserSerializer.new(resource).serializable_hash
    }, status: :ok
  end

  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [ :email, :password ])
  end
end
