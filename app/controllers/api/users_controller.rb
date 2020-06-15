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

    @user = User.find_by(id: user_id)

    @posts, @number_posts, @post_ids, @post_comments, @associated_users = Post.get_details_by_author(user_id, 400, 0)

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
