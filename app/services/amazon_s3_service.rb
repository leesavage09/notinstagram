class AmazonS3Service
  class << self
    def get_presigned_post(key:,
                           content_length_range: 1..2500000,
                           acl: "public-read",
                           cache_control: "max-age=2592000",
                           signature_expiration: (Time.now.utc + 15.minutes))
      aws_credentials = Aws::Credentials.new(
        ENV["AWS_ACCESS_KEY"],
        ENV["AWS_SECRET_KEY"]
      )

      s3_bucket = Aws::S3::Resource.new(
        region: "eu-west-2",
        credentials: aws_credentials,
      ).bucket(ENV["S3_BUCKET"])

      presigned_url = s3_bucket.presigned_post(
        key: key,
        success_action_status: "201",
        content_length_range: content_length_range,
        acl: acl,
        cache_control: cache_control,
        signature_expiration: signature_expiration,
      )
    end
  end
end
