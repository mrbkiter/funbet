'use strict'
const pkg = require('../package')

module.exports = {
  title: 'Funbet',
  // Options for webpack-dev-server
  // See https://webpack.js.org/configuration/dev-server
  devServer: {
    host: 'localhost',
    port: 4001,
    proxy: {
      '/user': 'http://localhost:9111',
      '/tournament': 'http://localhost:9111',
      '/report': 'http://localhost:9111',
      '/match': 'http://localhost:9111',
    }
  },
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  publicPath: '/'
}
