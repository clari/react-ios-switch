var path = require('path');

module.exports = {
  js: {
    test: /\.js$/,
    include: [
      path.join(__dirname, 'src'),
    ],
    loaders: ['babel', 'eslint']
  },
  css: {
    test: /\.scss$/,
    include: [
      path.join(__dirname, 'src'),
    ],
    loader: 'css?localIdentName=react-ios-switch-[name]-[local]'
  },
};
