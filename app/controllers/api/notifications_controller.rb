class Api::NotificationsController < ApplicationController
  before_action :require_user_logged_in

  def index
    @notes = Notification
      .includes(:source_user, source_post: [:author, likes: [:liker], comments: [:author]])
      .where(notified_user_id: logged_in_user.id)
      .order(created_at: :desc)
      .limit(20)
    @users = []
    @posts = []
    @comments = []

    @notes.each do |note|
      @users << note.source_user

      if note.source_post
        @posts << note.source_post if note.source_post
        post_ids, post_comments, associated_users = Post.get_associated_details(@posts)
        @users = @users + associated_users
        @comments = @comments + post_comments
      end
    end

    @users = User.where(id: @users)

    render :index
  end
end
