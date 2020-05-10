class User < ApplicationRecord
    validates :name, 
                length: { maximum: 30, message: "Name must be less than 30 characters." }
    validates :username, 
                presence: {message: "You must choose a username."}, 
                uniqueness: {message: "This username has already been taken."},
                length: {maximum: 30, message: "Username must be less than 30 characters."},
                format: { with: /\A[\w.]+\z/, message: "Username can only use letters, numbers, underscores and periods" }
    validates :bio, 
                length: {maximum: 150, message: "Bio must be under 150 characters."}
    validates :email, 
                presence: {message: "You must have an email address"}, 
                uniqueness: {message: "Email address has already signed up"}, 
                length: {maximum: 254, message: "Email is not valid"}, 
                format: { with: URI::MailTo::EMAIL_REGEXP, message: "Email is not valid" } 
    validates :session_token, 
                presence: true, 
                uniqueness: true
    validates :password_digest, 
                presence: true
    validates :password, 
                length: { minimum: 6, allow_nil: true, message: "Password must be at least 6 characters long" }
    
    before_validation :ensure_session_token
    before_validation :ensure_image_url
  
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

    def ensure_image_url
      self.image_url ||= User.generate_image_url
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
    
      def generate_image_url
        loop do
          url = "profile/"+SecureRandom::uuid+'.jpg'
          break url unless User.where(image_url: url).exists?
        end
      end

    end
end