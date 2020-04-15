class ApplicationController < ActionController::API

    def current_user
        User.find_by(session_token: session[:session_token])
    end

    def require_current_user!
        if current_user.nil?
            render json: "you must login!",  status: :unauthorized
        end
    end
    
end
