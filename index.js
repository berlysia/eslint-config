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
      "./eslint-core",
      "./plugins/eslint-comments",
      "./plugins/import",
      "./plugins/unicorn",
      "./plugins/sonarjs",
    ].map((x) => require.resolve(x)),
    "prettier",
  ],
};

presentRulesOnly.showAbsence();
