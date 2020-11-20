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
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-tslint-comment": "error",
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
    "brace-style": "off",
    "@typescript-eslint/brace-style": [
      "error",
      "1tbs",
      { allowSingleLine: true },
    ],
    "@typescript-eslint/class-literal-property-style": ["error", "fields"],
    "comma-spacing": "off",
    "@typescript-eslint/comma-spacing": [
      "error",
      { before: false, after: true },
    ],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-module-boundary-types": [
      "error",
      {
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowedNames: [],
      },
    ],
    "@typescript-eslint/func-call-spacing": "off",
    "@typescript-eslint/indent": "off",
    "init-declarations": "off",
    "@typescript-eslint/init-declarations": ["error"],
    "keyword-spacing": "off",
    "@typescript-eslint/keyword-spacing": ["error"],
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": ["error", "always"],
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-empty-function": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-extra-parens": "off",
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": "error",
    "@typescript-eslint/no-invalid-void-type": "error",
    "no-loss-of-precision": "error",
    "@typescript-eslint/no-loss-of-precision": "error",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-this-alias": "error",
    "@typescript-eslint/no-type-alias": "off",
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "all",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_.*$",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_.*$",
      },
    ],
    "@typescript-eslint/no-unused-vars-experimental": [
      "error",
      {
        ignoredNamesRegex: "^_",
        ignoreArgsIfArgsAfterAreUsed: true,
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    quotes: "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/triple-slash-reference": [
      "error",
      { path: "never", types: "never", lib: "never" },
    ],
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/type-annotation-spacing": "off",
    "@typescript-eslint/unified-signatures": "off",
    "@typescript-eslint/comma-dangle": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/no-implicit-any-catch": "error",
    "@typescript-eslint/no-loop-func": "error",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/space-infix-ops": "error",
  },
};
