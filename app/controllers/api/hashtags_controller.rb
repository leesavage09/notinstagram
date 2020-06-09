class Api::HashtagsController < ApplicationController
  before_action :require_user_logged_in

  def show
    hashtag_name = "#" + params.require(:id)
    @hashtag = Hashtag.find_by(name: hashtag_name)
    @posts, @number_posts, @post_ids, @post_comments, @associated_users = Post.get_details_by_hashtag(@hashtag.id, 4, 0)
    render :show_details
  end
end
