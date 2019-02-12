module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["prettier/@typescript-eslint"],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    loggerFn: false,
    sourceType: "module",
    jsx: true,
    project: "tsconfig.json",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": ["error", "array"],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          Array: null,
          Object: {
            message: "Use `object` instead",
            fixWith: "object",
          },
          object: "Use `{}` instead",
          String: {
            message: "Use `string` instead",
            fixWith: "string",
          },
          Number: {
            message: "Use `number` instead",
            fixWith: "number",
          },
          BigInt: {
            message: "Use `bigint` instead",
            fixWith: "bigint",
          },
          Boolean: {
            message: "Use `boolean` instead",
            fixWith: "boolean",
          },
        },
      },
    ],
    camelcase: "off",
    "@typescript-eslint/camelcase": [
      "error",
      { properties: "always", ignoreDestructuring: false },
    ],
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/generic-type-naming": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/interface-name-prefix": ["error", "never"],
    "@typescript-eslint/member-naming": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/no-angle-bracket-type-assertion": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-for-in-array": "off",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "error",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-triple-slash-reference": "error",
    "@typescript-eslint/no-type-alias": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_.*$",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_.*$",
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-interface": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/promise-function-async": [
      "off", // https://github.com/typescript-eslint/typescript-eslint/issues/227
      {
        allowedPromiseNames: [],
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
      },
    ],
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/type-annotation-spacing": "off",
  },
};
