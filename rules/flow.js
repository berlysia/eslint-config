module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["flowtype"],
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
  rules: {
    "flowtype/boolean-style": ["error", "boolean"],
    "flowtype/define-flow-type": "error",
    "flowtype/delimiter-dangle": "off",
    "flowtype/generic-spacing": ["error", "never"],
    "flowtype/no-dupe-keys": "error",
    "flowtype/no-primitive-constructor-types": "error",
    "flowtype/no-unused-expressions": "error",
    "flowtype/no-types-missing-file-annotation": "error",
    "flowtype/no-weak-types": "warn",
    "flowtype/object-type-delimiter": ["error", "comma"],
    "flowtype/require-parameter-type": [
      "error",
      { excludeArrowFunctions: "expressionsOnly" },
    ],
    "flowtype/require-return-type": [
      "error",
      "always",
      {
        excludeArrowFunctions: true,
        annotateUndefined: "always",
        excludeMatching: ["constructor"],
      },
    ],
    "flowtype/require-valid-file-annotation": "off",
    "flowtype/require-variable-type": [
      "error",
      {
        excludeVariableTypes: {
          var: false,
          let: false,
          const: true,
        },
      },
    ],
    "flowtype/semi": "off",
    "flowtype/space-after-type-colon": ["error", "always"],
    "flowtype/space-before-generic-bracket": ["error", "never"],
    "flowtype/space-before-type-colon": ["error", "never"],
    "flowtype/type-id-match": "off",
    "flowtype/union-intersection-spacing": ["error", "always"],
    "flowtype/use-flow-type": "warn",
  },
};
