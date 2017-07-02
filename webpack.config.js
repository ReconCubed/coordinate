const webpack = require('webpack');

module.exports = {
  entry: './client-test/firebase-test.js',
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
};

