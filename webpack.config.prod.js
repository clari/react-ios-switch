var autoprefixer = require('autoprefixer')
var commonConfig = require('./webpack.config.common')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './lib/Switch',
  output: {
    library: commonConfig.library,
    libraryTarget: 'umd',
    filename: `${commonConfig.library}.js`,
    path: path.join(__dirname, 'build')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'lib')
        ],
        loaders: ['babel', 'eslint']
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, 'lib')
        ],
        loader: ExtractTextPlugin.extract('style', [`css?localIdentName=${commonConfig.library}-[name]-[local]`, 'postcss', 'sass'].join('!'))
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(`../css/styles.css`)
  ],
  postcss: [autoprefixer]
}
