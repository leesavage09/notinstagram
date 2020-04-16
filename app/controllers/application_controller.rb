class ApplicationController < ActionController::API
 
    def login(user)
        user.reset_session_token!
        session[:session_token] = user.session_token
        @logged_in_user = user
    end

    def logout
        logged_in_user.reset_session_token!
        session[:session_token] = nil
        @logged_in_user = nil
    end

    def logged_in_user
        return nil unless session[:session_token]
        @logged_in_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!logged_in_user
    end

    def require_user_logged_in
        render json: {errors: ['unauthorized not logged in']},  status: :unauthorized if !logged_in?
    end
    
end