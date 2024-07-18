module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    VERSION: true,
    ENV: true,
  },
  rules: {
    quotes: 'off',
    'prefer-const': 'off',
    'no-undef': 'off',
    'no-self-assign': 'off',
    'no-self-assign': 'off',
    'no-unused-vars': 'off',
  },
}
