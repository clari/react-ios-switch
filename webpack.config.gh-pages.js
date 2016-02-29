var autoprefixer = require('autoprefixer');
var common = require('./webpack.config.common');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './src/exampleEntrypoint',
  output: {
    filename: 'bundle.js',
    path: 'build'
  },
  module: {
    loaders: [
      common.js,
      common.productionCSS
    ]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  postcss: [autoprefixer]
};
