process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.STATIC_RESOURCES = process.env.STATIC_RESOURCES || 'https://s3.eu-west-2.amazonaws.com/notinstagram.public'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()
