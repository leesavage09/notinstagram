process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.STATIC_RESOURCES = process.env.STATIC_RESOURCES || ''

const environment = require('./environment')

module.exports = environment.toWebpackConfig()
