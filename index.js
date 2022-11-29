const presentRulesOnly = require("./tools/presentRulesOnly");

module.exports = {
  parserOptions: {
    ecmaVersion: "latest",
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
};

presentRulesOnly.showAbsence();
