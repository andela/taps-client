const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './client/src/app.jsx',
  output: {
    path: path.join(__dirname, './client/public'),
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv({
      systemvars: true
    }),
    new ExtractTextPlugin('styles.css')
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    descriptionFiles: ['package.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(tff|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=250000'
      }
    ]
  }
};
