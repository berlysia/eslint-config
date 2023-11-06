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
  extends: [
    ...[
      "./configs/eslint-core",
      "./configs/eslint-comments",
      "./configs/import",
      "./configs/unicorn",
      "./configs/sonarjs",
    ].map((x) => require.resolve(x)),
    "prettier",
  ],
};

presentRulesOnly.showAbsence();
