const { default: berlysia } = require("../../dist/index.cjs");

const configs = berlysia(
  {},
  {
    rules: {
      "unicorn/prefer-module": "off",
    },
  },
);

module.exports = configs;
