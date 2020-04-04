const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { webpackConfig } = require('./base');
const getDefaultModules = require('./webpack-loader');

console.log(getDefaultModules());


const config = Object.assign({}, webpackConfig, {
  entry: {
    index: path.join(process.cwd(), 'render/index'),
  },
  cache: false,
  devtool: false,
  module: getDefaultModules(),
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.RUN_TYPE': JSON.stringify(process.env.RUN_TYPE === 'electron' ? 'electron' : 'web'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'render/index.html',
      chunks: ['index'],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  mode: 'production',
  optimization: {
    minimize: true //Update this to true or false
  }
});

config.module.rules.push({
  test: /\.js$/,
  use: [
    'babel-loader',
    // path.resolve(__dirname, './lazyLoader.js'),
  ],
  include: [
    path.join(process.cwd(), 'render'),
  ],
});

module.exports = config;
