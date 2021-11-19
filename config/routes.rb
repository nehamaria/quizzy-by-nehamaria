# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    resource :sessions, only: %i[create destroy]
    resources :quizzes, only: %i[create index destroy update show] do
     resources :questions, only: %i[create destroy show update]
   end
  end
  namespace :public do
    resources :quizzes, only: %i[show], param: :slug
    resources :users, only: %i[create], param: :slug
    resources :attempt_answers, only: %i[create]
    resources :attempts, only: %i[show index]
  end
  get "/export" => "reports#export"
  get "/export_status" => "reports#export_status"
  get "/export_download" => "reports#export_download"
  root "home#index"
  get "*path", to: "home#index", via: :all
end
