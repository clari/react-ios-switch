var common = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/libraryEntrypoint',
  output: {
    filename: 'bundle.js',
    libraryTarget: 'umd',
    path: 'build'
  },
  module: {
    loaders: [
      common.js,
      {
        test: common.css.test,
        include: common.css.include,
        loader: ExtractTextPlugin.extract('style', [common.css.loader, 'postcss', 'sass'].join('!'))
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};
