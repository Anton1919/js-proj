const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const buildResolvers = require('./config/webpack/buildResolvers');
const buildLoaders = require('./config/webpack/buildLoaders');
const buildPlugins = require('./config/webpack/buildPlugins');
const buildDevServer = require('./config/webpack/buildDevServer');
const jsLoaders = require('./config/loaders/buildBabelLoader');

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = !IS_DEV;

const fileName = (extension) => {
  return IS_DEV ? `bundle.${extension}` : `bundle.[contenthash].${extension}`;
};

const options = {
  MiniCssExtractPlugin,
  HtmlWebpackPlugin,
  CopyPlugin,
  fileName,
  jsLoaders,
  path,
  IS_PROD,
  IS_DEV,
};

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  resolve: buildResolvers(options),
  plugins: buildPlugins( options),
  module: {
    rules: buildLoaders(options),
  },
  devtool: IS_DEV ? 'inline-source-map' : false,
  devServer: buildDevServer(options),
};
