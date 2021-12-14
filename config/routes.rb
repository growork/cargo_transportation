Rails.application.routes.draw do
  root 'orders#index'

  resources :orders, only: [:index, :new, :show, :create]
end
