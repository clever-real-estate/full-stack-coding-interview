Rails.application.routes.draw do
  devise_for :users, path: "api/v1/users", controllers: {
    sessions: "api/v1/sessions"
  }

  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :photos, only: [ :index, :show ] do
        member do
          post :like
          delete :unlike
        end
      end
    end
  end
end
