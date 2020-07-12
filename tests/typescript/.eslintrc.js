module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      extends: ["../../index.js", "../../typescript.js"].map(require.resolve),
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
