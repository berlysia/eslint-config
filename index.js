module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {},
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["./eslint-core", "./plugins/eslint-comments", "./plugins/import"]
    .map(require.resolve)
    .concat("prettier"),
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
