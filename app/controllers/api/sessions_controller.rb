class Api::SessionsController < ApplicationController
  before_action :require_user_logged_in, except: [:create]

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login(@user)
      render :show
    else
      render json: { errors: { auth: ["Username or password incorect"] } }, status: 401
    end
  end

  def destroy
    @user = self.logged_in_user
    logout
    render :show
  end

  def avatar_presigned_url
    data = logged_in_user.image_s3_post_url
    render json: data, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
