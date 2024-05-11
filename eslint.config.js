const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    rules: {
      'no-unused-vars': 'warn',
    },
  },
  {
    ignores: ['build', 'node_modules', '*.html', '*.css', '*.scss'],
  },
  eslintPluginPrettierRecommended,
];
