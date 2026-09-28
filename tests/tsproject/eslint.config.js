const { default: berlysia } = require("../../dist/index.cjs");

const configs = berlysia({
  typescript: {
    tsConfigPath: "./tsconfig.json",
  },
  react: true,
  testLibrary: "jest",
});

module.exports = configs;
