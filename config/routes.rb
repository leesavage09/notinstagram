  # get     'users', to: 'users#index', as: 'users'
  # get     'users/new', to: 'users#new',  as: 'new_user'
  # get     'users/:id/edit', to: 'users#edit', as: 'edit_user'
  # get     'users/:id', to: 'users#show', as: 'show_user'
  # post    'users', to: 'users#create',  as: 'create_user'
  # patch   'users/:id', to: 'users#update', as: 'update_user_1'
  # put     'users/:id', to: 'users#update',  as: 'update_user_2'
  # delete  'users/:id', to: 'users#destroy',  as: 'destroy_user'


Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :users, only: [:index, :show, :create, :update, :destroy]
  resource :session, only: [:create, :destroy]

end
