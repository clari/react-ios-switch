var common = require('./webpack.config.common');
var webpack = require('webpack');

module.exports = {
  entry: './src/libraryEntrypoint',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'umd',
    path: 'build'
  },
  module: common.module
};
