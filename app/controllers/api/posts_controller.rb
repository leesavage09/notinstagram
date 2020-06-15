class Api::PostsController < ApplicationController
  before_action :require_user_logged_in

  def index
    @posts = Post.order(created_at: :desc).limit(10).offset(0)
    @post_ids, @post_comments, @associated_users = Post.get_associated_details(@posts)
    render :index, status: :ok
  end

  def show
    @post, @post_comments, @associated_users = Post.get_details_by_post_id(params.require(:id))

    render json: { errors: { post: ["Post not found"] } }, status: 404 unless @post
    render :show, status: :ok
  end

  def create
    begin
      post = Post.new
      post.author = logged_in_user
      post.caption = params.require(:caption)
      tag_post(post.caption.scan(/#(\w+)/).flatten, post)
      post.save!
      @post = post
      @s3data = post.image_s3_post_url
      render :show_s3, status: :ok
    rescue Exception => e
      render json: e, status: 401
    end
  end

  def update
    post = Post.find_by(id: params.require(:id))
    post.caption = params[:caption] if params[:caption]
    post.image_url = params[:image_url] if params[:image_url]
    if post.save()
      @post, @post_comments, @associated_users = Post.get_details_by_post_id(post.id)
      render :show, status: :ok
    else
      render json: post.errors, status: 401
    end
  end

  private

  def tag_post(hashtags, post)
    hashtags.each do |tag_name|
      tag_name = "#" + tag_name
      hashtag = Hashtag.find_by(name: tag_name)

      if !hashtag
        hashtag = Hashtag.new
        hashtag.name = tag_name
        hashtag.save!
      end

      tagging = Tagging.new
      tagging.hashtag = hashtag
      tagging.post = post
      tagging.save!
    end
  end
end
