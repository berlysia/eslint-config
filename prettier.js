module.exports = {
  plugins: ["prettier"],
  extends: ["./rules/base", "./rules/flow", "./rules/react"]
    .map(require.resolve)
    .concat("prettier", "prettier/flowtype", "prettier/react"),
  rules: {
    "prettier/prettier": "error",
  },
};
