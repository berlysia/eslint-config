module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  extends: ["../../auto.js"],
  rules: {
    "unicorn/prefer-module": "off",
  },
};
