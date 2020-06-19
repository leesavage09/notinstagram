class AddParentPostIdToComments < ActiveRecord::Migration[6.0]
  def self.up
    # add new column
    add_column :comments, :parent_post_id, :integer, null: true
    # Make sure no null value exist
    comments = Comment.where(parent_post_id: nil)
    comments.each do |comment|
      comment.parent_post_id = get_comment_parent_post(comment)
      comment.save!()
    end
    # Change the column to not allow null
    change_column :comments, :parent_post_id, :integer, null: false

    add_index :comments, :parent_post_id
  end

  private

  def self.get_comment_parent_post(comment)
    case comment.parent_type
    when "Post"
      return comment.parent_id
    when "Comment"
      return get_comment_parent_post(comment.parent)
    end
  end
end
