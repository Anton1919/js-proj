const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = !IS_DEV;

function jsLoaders() {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (IS_DEV) {
    loaders.push('eslint-loader');
  }

  return loaders;
}

const fileName = (extension) => {
  return IS_DEV ? `bundle.${extension}` : `bundle.[contenthash].${extension}`;
};

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  mode: 'development',
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  resolve: {
    extensions: ['.js'],
    preferAbsolute: true,
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src', 'core'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {removeComments: IS_PROD, collapseWhitespace: IS_PROD},
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon.ico'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
  devtool: IS_DEV ? 'inline-source-map' : false,
  devServer: {
    port: 3000,
    open: IS_DEV,
    hot: IS_DEV,
    watchFiles: [path.resolve(__dirname, './src/*.html')],
  },
};

