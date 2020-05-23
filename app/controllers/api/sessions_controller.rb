class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login(@user)
      render :show
    else
      render json: { errors: { auth: ["username or password incorect"] } }, status: 401
    end
  end

  def destroy
    @user = self.logged_in_user
    if @user
      logout
      render :show
    else
      render json: { errors: { auth: ["already logged out"] } }, status: 404
    end
  end

  def get_s3_presigned
    data = logged_in_user.image_s3_post_url
    render json: data, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
