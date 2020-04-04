const path = require('path');

module.exports = {
  entry: {
    index: './render/index.js',
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'render-process')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
}