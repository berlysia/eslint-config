const presentRulesOnly = require("./tools/presentRulesOnly");

module.exports = {
  overrides: [
    {
      files: [
        "*.{test,spec}.{js,ts,jsx,tsx}",
        "**/__tests__/**/*.{js,ts,jsx,tsx}",
      ],
      rules: presentRulesOnly({
        "@typescript-eslint/unbound-method": "off",
        "jest/unbound-method": "error",
        "jest/no-untyped-mock-factory": "error",
      }),
    },
  ],
};
