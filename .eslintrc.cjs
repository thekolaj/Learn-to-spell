/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

const path = require('node:path')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-airbnb',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // TypeScript does a better job for import checks than ESLint
    'no-use-before-define': ['error', { functions: false }],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
  },
  settings: {
    // to make our custom @ alias resolvable by ESLint import rules
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {},
      [require.resolve('eslint-import-resolver-custom-alias')]: {
        alias: {
          '@': `${path.resolve(__dirname, './src')}`,
        },
        extensions: ['.mjs', '.js', '.jsx', '.json', '.node', '.ts', '.tsx'],
      },
    },
  },
}
