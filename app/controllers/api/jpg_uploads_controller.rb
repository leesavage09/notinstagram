require 'aws-sdk-s3' 

class Api::JpgUploadsController < ApplicationController

    before_action :require_user_logged_in

    def index
      aws_credentials = Aws::Credentials.new(
        ENV['AWS_ACCESS_KEY'],
        ENV['AWS_SECRET_KEY']
      )
      
      s3_bucket = Aws::S3::Resource.new(
        region: 'eu-west-2',
        credentials: aws_credentials
      ).bucket(ENV['S3_BUCKET'])

      presigned_url = s3_bucket.presigned_post(
        key: logged_in_user.image_url,   #SecureRandom::uuid+'.jpg',
        success_action_status: '201',
        content_length_range: 1..2500000,
        acl: 'public-read',
        signature_expiration: (Time.now.utc + 15.minutes)
      )
    
      data = { url: presigned_url.url, url_fields: presigned_url.fields }
    
      render json: data, status: :ok
    end

end
