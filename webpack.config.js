var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'whatwg-fetch',
    'react-infinite-calendar/styles.css',
    './client/src/index.js'
  ],
  output: { path: path.join(__dirname, 'build'), filename: 'index.js' },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Event Calendar',
      template: 'client/index.html'
    })
  ]
};
