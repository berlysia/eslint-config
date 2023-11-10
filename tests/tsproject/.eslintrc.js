module.exports = {
  extends: ["../../dist/auto.js"],
  rules: {
    "unicorn/prefer-module": "off",
  },
  overrides: [
    {
      files: ["**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
