module.exports = {
  extends: ["../../index.js", "../../typescript.js"].map(require.resolve),
  parserOptions: {
    project: "./tsconfig.json",
  },
};
