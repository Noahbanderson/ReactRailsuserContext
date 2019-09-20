Rails.application.routes.draw do
  namespace :api do
    resources :users do
      resources :pets
    end
  end
end
