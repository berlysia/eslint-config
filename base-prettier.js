module.exports = {
  plugins: ["prettier"],
  extends: ["./base"].map(require.resolve).concat("prettier"),
  rules: {
    "implicit-arrow-linebreak": "off",
    "prettier/prettier": "error",
  },
};
