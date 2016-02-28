var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loaders: ['babel', 'eslint']
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loaders: ['style', 'css?localIdentName=react-ios-switch-[name]-[local]', 'postcss', 'sass']
      }
    ]
  },
  postcss: [autoprefixer]
};
