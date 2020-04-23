class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(user_params[:username],user_params[:password])
        if @user 
            login(@user)
            render :show 
        else
            render json: {errors: {auth: ['username or password incorect']}}, status: 401
        end 
    end

    def destroy
        @user = self.logged_in_user
        if @user
            logout
            render :show
        else 
            render json:  {errors: {auth: ['already logged out']}}, status: 404
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end

end
