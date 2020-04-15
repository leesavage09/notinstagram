class SessionsController < ApplicationController

    def create
        u = User.find_by_credentials(user_params[:username],user_params[:password])
        if u 
            u.reset_session_token!
            session[:session_token] = u.session_token
            render json: u    
        else
            render json: "username or password incorect"
        end 
    end

    
    def destroy
        user = self.current_user
        user.reset_session_token! if user
        session[:session_token] = nil
        render json: user
    end

    private
    def user_params
        params.require(:user).permit(:username, :password)
    end

end
