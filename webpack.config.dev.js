var autoprefixer = require('autoprefixer');
var common = require('./webpack.config.common');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    './src/exampleEntrypoint'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      common.js,
      common.devCSS
    ]
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8080,
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  postcss: [autoprefixer]
};
