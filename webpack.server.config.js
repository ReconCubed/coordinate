const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './bundle/');

const config = {
  target: 'node',
  entry: ['./server/server.js'],
  output: {
    path: BUILD_DIR,
    filename: 'server-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.js)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  }
};

module.exports = config;
