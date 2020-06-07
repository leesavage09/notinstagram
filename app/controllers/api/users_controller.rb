class Api::UsersController < ApplicationController
  before_action :require_user_logged_in, except: [:create]

  def index
    @users = User.where("username ILIKE :q or name ILIKE :q",
                        q: "%" + query_param + "%")
      .where.not(id: logged_in_user.id)
      .order(:username)
      .limit(55)
    render :index
  end

  def show
    user_id = params.require(:id)
    limit = 4

    @user = User.find_by(id: user_id)
    @posts = Post.includes(:likes, :comments).where(author_id: user_id).order("created_at DESC").limit(4).offset(0)
    @post_comments = []
    associated_user_ids = []

    @posts.each do |post|
      post.likes.each do |like|
        associated_user_ids << like.liker_id
      end
      post.comments.each do |comment|
        @post_comments << comment
        associated_user_ids << comment.author_id
      end
    end

    @associated_users = User.where(id: associated_user_ids)

    render :show_details
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :private_show
    else
      render json: { errors: @user.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    if logged_in_user.id != params.require(:id).to_i
      render json: { errors: { auth: ["You must be logged in"] } }, status: :forbidden
    elsif logged_in_user.username === "guest"
      render json: { errors: { auth: ["The guest account cannot be changed"] } }, status: :forbidden
    else
      @user = logged_in_user
      @user.update(user_params)
      if @user.save
        render :private_show
      else
        render json: { errors: logged_in_user.errors.messages }, status: :unprocessable_entity
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :name, :email, :bio, :image_url)
  end

  def query_param
    params.require(:q)
  end
end
