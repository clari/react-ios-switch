var autoprefixer = require('autoprefixer')
var commonConfig = require('./webpack.config.common')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    './example/app'
  ],
  output: {
    filename: 'app.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'example'),
          path.join(__dirname, 'lib')
        ],
        loaders: ['babel', 'eslint']
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, 'example'),
          path.join(__dirname, 'lib')
        ],
        loaders: ['style', `css?localIdentName=${commonConfig.library}-[name]-[local]`, 'postcss', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true
  },
  postcss: [autoprefixer]
}
