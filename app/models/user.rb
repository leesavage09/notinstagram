    # has_many :artwork_shares,
    # foreign_key: :viewer_id,
    # dependent: :destroy

    # has_many :shared_artworks, 
    # through: :artwork_shares, 
    # source: :artwork

    # has_many :artworks, 
    # foreign_key: :artist_id,
    # dependent: :destroy

    # has_many :comments, 
    # dependent: :destroy

class User < ApplicationRecord
    validates :name, 
                length: { maximum: 30 }
    validates :username, 
                presence: true, 
                uniqueness: true, 
                length: {maximum: 30},
                format: { with: /\A[\w.]+\z/, message: "can only use letters, numbers, underscores and periods" }
    validates :bio, 
                length: {maximum: 150}
    validates :email, 
                presence: true, 
                uniqueness: true, 
                length: {maximum: 254}, 
                format: { with: URI::MailTo::EMAIL_REGEXP } 
    validates :session_token, 
                presence: true, 
                uniqueness: true
    validates :password_digest, 
                presence: { message: 'Password can\'t be blank'}
    validates :password, 
                length: { minimum: 6, allow_nil: true }
    
    before_validation :ensure_session_token
  
    attr_reader :password

    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
      self.session_token = User.generate_session_token
      self.save!
      self.session_token
    end

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end

    class << self
      
      def find_by_credentials(username, password)
        user = User.find_by(username: username)
        return user if user && BCrypt::Password.new(user.password_digest).is_password?(password)
        nil
      end

      def generate_session_token
        loop do
          token = SecureRandom::urlsafe_base64(16)
          break token unless User.where(session_token: token).exists?
        end
      end
    
    end
end