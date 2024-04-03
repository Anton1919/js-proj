function buildLoaders({MiniCssExtractPlugin, jsLoaders, IS_DEV}) {
  return [
    {
      test: /\.s[ac]ss$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: jsLoaders(IS_DEV),
    },
  ];
}

module.exports = buildLoaders;
