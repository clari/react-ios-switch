const path = require('path');
const webpack = require('webpack');

const common = require('./webpack.config.common');

// no externals for backwards compatibility
module.exports = {
  ...common,
  entry: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    library: 'Switch',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
