function jsLoaders(IS_DEV) {
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

module.exports = jsLoaders;
