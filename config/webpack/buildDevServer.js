function buildDevServer({IS_DEV, path}) {
  return {
    port: 3000,
    open: IS_DEV,
    hot: IS_DEV,
    watchFiles: [path.resolve(__dirname, '../../src/*.html')],
  };
}

module.exports = buildDevServer;
