module.exports = {
  plugins: ["prettier"],
  extends: ["./base"].map(require.resolve).concat("prettier"),
  rules: {
    "prettier/prettier": "error",
  },
};
