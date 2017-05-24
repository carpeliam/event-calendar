const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { googleCalendarAuthLink } = require('./lib/config');

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
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      googleCalendarAuthLink: JSON.stringify(googleCalendarAuthLink),
    })
  ]
};
