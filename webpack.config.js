var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    './src/entrypoint'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src')
        ],
        loaders: ['babel', 'eslint']
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, 'src')
        ],
        loaders: ['style', 'css', 'postcss', 'sass']
      }
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
