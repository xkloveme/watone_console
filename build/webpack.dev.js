const webpack = require('webpack')

exports = require('./webpack.base')

exports.mode = 'development'
exports.output.filename = 'wtConsole.js'
exports.devtool = 'source-map'
exports.plugins = exports.plugins.concat([
  new webpack.DefinePlugin({
    ENV: '"development"',
  }),
])

module.exports = exports
