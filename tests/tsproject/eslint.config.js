const { default: berlysia } = require("../../dist/index.cjs");

const configs = berlysia({
  typescript: {
    tsConfigPath: "./tsconfig.json",
  },
});

module.exports = configs;
