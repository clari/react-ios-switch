var autoprefixer = require('autoprefixer')
var commonConfig = require('./webpack.config.common')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './example/app',
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'build')
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
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'node_modules/react-resizable/css/styles.css')
        ],
        loaders: ['style', 'css']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  postcss: [autoprefixer]
}
