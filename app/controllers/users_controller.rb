class UsersController < ApplicationController

   before_action :require_current_user!, except: [:create]
    
    
    def index
        if params[:search]
          users = User.where('username ILIKE ?', "%#{params[:search]}%")
        else 
          users = User.all
        end
        render json: users
    end
    
    def create
        user = User.new(user_params)
        if user.save
            render json: user
          else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
        
    end
    
    def update
        user = current_user
        if !user || user.id != params.require(:id).to_i
          render json: "you don't have permission" , status: :forbidden
          return
        end
              
        user.update(user_params)
        if user.save
            render json: user
          else
            render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end
    
    def destroy
        user = User.find(params.require(:id))
        render json: user.destroy
    end
    
    def show
        render json: User.find(params.require(:id))
    end
    
    private
    def user_params
      params.require(:user).permit(:username, :password, :name, :email)
    end
    
end