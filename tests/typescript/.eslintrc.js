module.exports = {
  overrides: [
    {
      files: ["*.ts"],
      extends: ["../../dist/index.js", "../../dist/configs/typescript.js"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
