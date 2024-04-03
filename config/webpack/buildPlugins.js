function buildPlugins(
    {MiniCssExtractPlugin,
      HtmlWebpackPlugin,
      fileName,
      path,
      CopyPlugin,
      IS_PROD}
) {
  return [
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.html'),
      minify: {removeComments: IS_PROD, collapseWhitespace: IS_PROD},
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../src/favicon.ico'),
          to: path.resolve(__dirname, '../../build'),
        },
      ],
    }),
  ];
}

module.exports = buildPlugins;
