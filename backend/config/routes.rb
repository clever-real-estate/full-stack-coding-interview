Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do

    namespace :v1 do
      resources :users, only: [:create]
      post "/authenticate", to: "authentication#create"
      resource :password_resets, only: [:create, :update]
      resources :photos, only: [:index] do
        resources :likes, only: [:create, :destroy]
      end
    end
  end
end
