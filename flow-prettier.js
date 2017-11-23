module.exports = {
  plugins: ["prettier"],
  extends: ["./flow"]
    .map(require.resolve)
    .concat("prettier", "prettier/flowtype"),
  rules: {},
};
