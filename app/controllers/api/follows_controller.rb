class Api::FollowsController < ApplicationController
  before_action :require_user_logged_in

  def index
    user = User.includes(:followers).find_by(id: params.require(:user_id))

    case params.require(:type)
    when "followers"
      @ids = user.followers.ids
      @users = user.followers
      render :index
    when "followed_users"
      @ids = user.followed_users.ids
      @users = user.followed_users
      render :index
    else
      render json: { errors: ["wrong type parameter"] }, status: :unprocessable_entity
    end
  end

  def create
    user = User.find_by(id: params.require(:user_id))
    if !user
      render json: { errors: ["can't follow as user can't be found"] }, status: 404
      return
    else
      follow = Follow.new
      follow.follower = logged_in_user
      follow.followed = user
    end
    if follow.save()
      @user = logged_in_user
      render :show
    else
      render json: follow.errors, status: :unprocessable_entity
    end
  end

  def destroy
    follow = Follow.select(:id).where(follower_id: logged_in_user.id, followed_id: params.require(:id), followed_type: params.require(:followed_type)).limit(1).first
    if !follow
      render json: { errors: ["not following this"] }, status: 404
    elsif follow.destroy
      @user = logged_in_user
      render :show
    else
      render json: follow.errors, status: :unprocessable_entity
    end
  end
end
