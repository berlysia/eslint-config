module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["prettier/@typescript-eslint", "plugin:import/typescript"],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
  },
  rules: {
    "@typescript-eslint/await-thenable": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-unnecessary-condition": [
      "error",
      { ignoreRhs: true },
    ],
    "@typescript-eslint/no-unnecessary-qualifier": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-includes": "error",
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
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/unbound-method": [
      "error",
      {
        ignoreStatic: true,
      },
    ],
  },
};
