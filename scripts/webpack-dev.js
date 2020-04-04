const path = require('path');
const webpack = require('webpack');
const { spawn } = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { PORT, webpackConfig } = require('./base');
const getDefaultModules = require('./webpack-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = Object.assign({}, webpackConfig, {
  entry: {
    index: [
      './render/index',
    ],
  },
  output: Object.assign(webpackConfig.output, {
    path: path.join(process.cwd(), 'assets'),
    publicPath: `http://localhost:${PORT}/`,
  }),
  devServer: {
    contentBase: './assets/',
    historyApiFallback: true,
    hot: true,
    port: PORT,
    noInfo: false,
    stats: {
      colors: true,
    },
    setup() {
      spawn(
        'electron',
        ['.'],
        {
          shell: true,
          env: Object.assign({
            PORT,
          }, process.env),
          stdio: 'inherit',
        }
      )
        .on('close', () => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    },
  },
  cache: true,
  devtool: 'eval-source-map',
  module: getDefaultModules(),
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'render/index.html',
      chunks: ['index'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.RUN_TYPE': JSON.stringify(process.env.RUN_TYPE === 'electron' ? 'electron' : 'web'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

config.module.rules.push({
  test: /\.js$/,
  use: [
    'babel-loader',
    path.resolve(__dirname, './lazyLoader.js'),
  ],
  include: [
    path.join(process.cwd(), 'render'),
  ],
});

module.exports = config;
