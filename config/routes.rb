Rails.application.routes.draw do
  root to: 'posts#index'
  resources :posts, only: [:index, :create]
  get 'posts/:id', to: 'posts#checked'
  post '/callback', to: 'linebot#callback'
end