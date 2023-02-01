module.exports = {
  extends: ["./index.js"].map((x) => require.resolve(x)),
  rules: {
    "unicorn/prefer-module": "off",
    "unicorn/no-empty-file": "off",
  },
};
