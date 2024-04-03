function buildResolvers({path}) {
  return {
    extensions: ['.js'],
    preferAbsolute: true,
    alias: {
      '@': path.resolve(__dirname, '../../src'),
      '@core': path.resolve(__dirname, '../../src/core'),
    },
  };
}

module.exports = buildResolvers;
