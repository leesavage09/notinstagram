class Api::CommentsController < ApplicationController
  before_action :require_user_logged_in

  def create
    begin
      post = Post.find_by(id: params.require(:post_id))
      
      @comment = Comment.new
      @comment.body = params.require(:body)
      @comment.author = logged_in_user
      @comment.parent = post #TODO later comments on other comments
      @comment.parent_post = post
      @comment.save!()
      @post = Post.find_by(id: params.require(:post_id))

      Notification.save_notification(@post.author_id, Notification::COMMENTED_POST, @comment) unless @post.author_id == logged_in_user.id

      render :show, status: :ok
    rescue Exception => e
      render json: e, status: 401
    end
  end
end
