const path = require('path');
const webpack = require('webpack');

const common = require('./webpack.config.common');

module.exports = {
  ...common,
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/dev/entrypoint'),
  ],
  output: {
    publicPath: '/static/',
  },
  devtool: 'eval',
  devServer: {
    port: 8080,
    hot: true,
    inline: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
