class Api::FollowsController < ApplicationController
  before_action :require_user_logged_in

  def index
    case params.require(:type)
    when "followers"
      follows = Follow.includes(:follower).where(followed_id: params.require(:user_id), followed_type: "User")
      @ids = []
      @users = []
      follows.each { |follow|
        @ids << follow.follower_id
        @users << follow.follower
      }
      render :index
    when "followed_users"
      follows = Follow.includes(:followed).where(follower_id: params.require(:user_id), followed_type: "User")
      @ids = []
      @users = []
      follows.each { |follow|
        @ids << follow.followed_id
        @users << follow.followed
      }
      render :index
    else
      render json: { errors: ["wrong type parameter"] }, status: :unprocessable_entity
    end
  end

  def create
    follow = Follow.new
    follow.follower = logged_in_user

    if params[:user_id]
      follow.followed = User.find_by(id: params[:user_id])
    elsif params[:hashtag_id]
      follow.followed = Hashtag.find_by(id: params[:hashtag_id])
    else
      render json: { errors: ["No user_id or hashtag_id provided"] }, status: 404
      return
    end

    if follow.save()
      Notification.save_notification(follow.followed.id, Notification::STARTED_FOLLOWING, follow)
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
