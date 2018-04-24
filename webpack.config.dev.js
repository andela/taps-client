const merge = require('webpack-merge');
const common = require('./webpack.config');
const path = require('path');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    proxy: {
      '/api/v1/**': {
        target: 'http://[::1]:8080',
        secure: false
      }
    },
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true
  }
});
