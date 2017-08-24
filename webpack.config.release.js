var autoprefixer = require('autoprefixer');
var common = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/libraryEntrypoint',
  output: {
    filename: 'bundle.js',
    library: 'Switch',
    libraryTarget: 'umd',
    path: 'build'
  },
  module: {
    loaders: [
      common.js,
      common.productionCSS
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  postcss: [autoprefixer]
};
