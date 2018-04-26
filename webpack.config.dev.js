const merge = require('webpack-merge');
const common = require('./webpack.config');
const path = require('path');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true
  }
});
