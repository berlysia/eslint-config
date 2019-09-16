module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["prettier/@typescript-eslint", "plugin:import/typescript"],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
    project: "tsconfig.json",
  },
  rules: {
    "@typescript-eslint/await-thenable": "off", // requires type information
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-for-in-array": "off",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "off", // requires type information
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off", // requires type information
    "@typescript-eslint/prefer-includes": "off", // requires type information
    "@typescript-eslint/prefer-interface": "off",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/promise-function-async": [
      "error",
      {
        allowedPromiseNames: [],
        checkArrowFunctions: false,
        checkFunctionDeclarations: false,
        checkFunctionExpressions: false,
        checkMethodDeclarations: true,
      },
    ],
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/restrict-plus-operands": "off", // requires type information
    "@typescript-eslint/strict-boolean-expressions": "off", // TS 3.7が来たら考える
    "@typescript-eslint/unbound-method": "off",
  },
};
