class Api::NotificationsController < ApplicationController
  before_action :require_user_logged_in

  def index #TODO can improve efficiency by only getting post images 
    @notes = Notification.includes(:source_user, source_post: [:likes, :comments]).where(notified_user_id: logged_in_user.id).order(created_at: :desc).limit(10)
    @source_users = []
    @source_posts = []

    @notes.each do |note|
      @source_users << note.source_user
      @source_posts << note.source_post if note.source_post
    end

    render :index
  end
end
