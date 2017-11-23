module.exports = {
  plugins: ["prettier"],
  extends: ["./react"]
    .map(require.resolve)
    .concat("prettier", "prettier/react"),
  rules: {},
};
