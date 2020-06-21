class Api::LikesController < ApplicationController
  before_action :require_user_logged_in

  def create
    begin
      post = Post.find_by(id: params.require(:post_id))
      if !post
        render json: { errors: { error: ["Post not found"] } }, status: 404
      else
        like = Like.new
        like.liker = logged_in_user
        like.liked = post
        like.save!()

        @post = Post.find_by(id: params.require(:post_id))

        Notification.save_notification(@post.author_id, Notification::LIKED_POST, like) unless @post.author_id == logged_in_user.id
        render :show_post, status: :ok
      end
    rescue Exception => e
      render json: { errors: [e] }, status: 401
    end
  end

  def destroy
    begin
      if params[:post_id]
        like = Like.find_by(liked_type: "Post", liked_id: params[:post_id], liker_id: logged_in_user.id)
        if !like
          render json: { errors: ["Like not found"] }, status: 404
        else
          like.destroy!()
          @post = Post.find_by(id: params[:post_id])
          render :show_post, status: :ok
        end
      elsif params[:comment_id]
        like = Like.find_by(liked_type: "Comment", liked_id: params[:comment_id], liker_id: logged_in_user.id)
        if !like
          render json: { errors: ["Like not found"] }, status: 404
        else
          like.destroy!()
          @comment = Comment.find_by(id: params[:comment_id])
          render :show_comment, status: :ok
        end
      else
        render json: { errors: ["No post_id or comment_id provided"] }, status: 404
      end
    rescue Exception => e
      render json: { errors: [e] }, status: 401
    end

  end
end
