class Api::UsersController < ApplicationController
  before_action :require_user_logged_in, except: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: { errors: @user.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    if !logged_in? || logged_in_user.id != params.require(:id).to_i
      render json: { errors: { auth: ["You must be logged in"] } }, status: :forbidden
    else
      @user = logged_in_user
      @user.update(user_params)
      if @user.save
        render :show
      else
        render json: { errors: logged_in_user.errors.messages }, status: :unprocessable_entity
      end
    end
  end

  def get_s3_presigned
    data = logged_in_user.image_s3_post_url
    render json: data, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :name, :email, :bio, :image_url)
  end
end
