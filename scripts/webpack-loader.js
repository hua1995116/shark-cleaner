
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const LessNpmImportPlugin = require('less-plugin-npm-import');

module.exports = () => {
  const loaders = [
    {
      test: /\.(png|jpg|gif|woff|woff2)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          mimetype: 'application/font-woff',
        },
      }],
    }, {
      test: /\.(mp4|ogg)$/,
      loader: 'file-loader',
    }, {
      test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      }],
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      use: {
        loader: 'html-loader'
      }
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader'
      }
    }
  ];
  if (process.env.NODE_ENV === 'production') {
    loaders.push({
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    });
    loaders.push({
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
    });
  } else {
    loaders.push({
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader, 'css-loader',
      ],
    });
    loaders.push({
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
    });
  }
  return {
    rules: loaders,
  };
};
