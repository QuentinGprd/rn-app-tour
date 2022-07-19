module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
