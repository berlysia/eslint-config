const { default: berlysia } = require("../../dist/index.cjs");

const configs = berlysia(
  { react: true, testLibrary: "jest" },
  {
    rules: {
      "unicorn/prefer-module": "off",
    },
  },
);

module.exports = configs;
