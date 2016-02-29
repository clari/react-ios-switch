var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

const cssTest = /\.scss$/;
const cssInclude = [
  path.join(__dirname, 'src'),
];
const cssLoader = 'css?localIdentName=react-ios-switch-[name]-[local]';

module.exports = {
  js: {
    test: /\.js$/,
    include: [
      path.join(__dirname, 'src'),
    ],
    loaders: ['babel', 'eslint']
  },
  devCSS: {
    test: cssTest,
    include: cssInclude,
    loaders: ['style', cssLoader, 'postcss', 'sass']
  },
  productionCSS: {
    test: cssTest,
    include: cssInclude,
    loader: ExtractTextPlugin.extract('style', [cssLoader, 'postcss', 'sass'].join('!'))
  }
};
