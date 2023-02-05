module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      extends: ["../../index.js", "../../typescript.js"].map((x) =>
        require.resolve(x)
      ),
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
