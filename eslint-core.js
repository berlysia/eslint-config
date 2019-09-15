module.exports = {
  rules: {
    "callback-return": "off",
    "global-require": "off",
    "handle-callback-err": "off",
    "max-classes-per-file": ["error", 1],
    "max-lines-per-function": "off", // 分けたくなるまで分けないので黙らせる
    "no-async-promise-executor": "error",
    "no-buffer-constructor": "error",
    "no-fallthrough": "error",
    "no-irregular-whitespace": "error",
    "no-misleading-character-class": "error",
    "no-mixed-requires": "off",
    "no-new-require": "error",
    "no-path-concat": "error",
    "no-process-env": "off",
    "no-process-exit": "off",
    "no-restricted-modules": "off",
    "no-sync": "off",
    "no-useless-catch": "error",
    "prefer-object-spread": "error",
    "require-atomic-updates": "error",
    "require-unicode-regexp": "off",
    "for-direction": "off",
    "getter-return": "error",
    "no-await-in-loop": "off",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-console": "off",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-parens": "off",
    "no-extra-semi": "error",
    "no-func-assign": "error",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-obj-calls": "error",
    "no-prototype-builtins": "error",
    "no-regex-spaces": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "warn",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "use-isnan": "error",
    "valid-jsdoc": "off",
    "valid-typeof": "error",
    "accessor-pairs": "off",
    "array-callback-return": "error",
    "block-scoped-var": "off", // var is banned
    "class-methods-use-this": "error",
    complexity: ["error", { max: 10 }],
    "consistent-return": "error",
    curly: ["error", "multi-or-nest"],
    "default-case": "off",
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    eqeqeq: "error",
    "guard-for-in": "error",
    "no-alert": "error",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-div-regex": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-empty-pattern": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-floating-decimal": "error",
    "no-global-assign": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-magic-numbers": "off",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-redeclare": "error",
    "no-restricted-properties": "off",
    "no-return-assign": "error",
    "no-return-await": "off",
    "no-script-url": "error",
    "no-self-assign": ["error", { props: false }],
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-warning-comments": "warn",
    "no-with": "error",
    "prefer-promise-reject-errors": [
      "error",
      {
        allowEmptyReject: true,
      },
    ],
    radix: "error",
    "require-await": "off",
    "vars-on-top": "error",
    "wrap-iife": ["error", "outside"],
    yoda: ["error", "never", { exceptRange: true }],
    strict: "off",
    "init-declarations": "error",
    "no-catch-shadow": "error",
    "no-delete-var": "error",
    "no-label-var": "error",
    "no-restricted-globals": "off",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-undefined": "off",
    "no-unused-vars": [
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
    "no-use-before-define": "error",
    "array-bracket-newline": ["error", { multiline: true }],
    "array-bracket-spacing": ["error", "never"],
    "array-element-newline": ["error", { multiline: true }],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { allowSingleLine: true }],
    camelcase: "off",
    "capitalized-comments": "off",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { before: false, after: true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "consistent-this": "off",
    "eol-last": ["error", "always"],
    "func-call-spacing": "off",
    "func-name-matching": "off",
    "func-names": "off",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "function-paren-newline": ["error", "multiline"],
    "id-blacklist": "off",
    "id-length": "off",
    "id-match": "off",
    "implicit-arrow-linebreak": ["error", "beside"],
    indent: ["error", 2],
    "jsx-quotes": ["error", "prefer-double"],
    "key-spacing": [
      "error",
      { beforeColon: false, afterColon: true, mode: "strict" },
    ],
    "keyword-spacing": ["error", { before: true, after: true }],
    "line-comment-position": "off",
    "linebreak-style": ["error", "unix"],
    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
        allowClassStart: true,
        allowClassEnd: true,
      },
    ],
    "lines-between-class-members": ["error", "always"],
    "max-depth": ["error", { max: 4 }],
    "max-len": [
      "error",
      {
        code: 80,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "max-lines": "off",
    "max-nested-callbacks": ["error", { max: 3 }],
    "max-params": ["error", { max: 3 }],
    "max-statements": "off",
    "max-statements-per-line": ["error", { max: 2 }],
    "multiline-comment-style": ["error", "bare-block"],
    "multiline-ternary": ["error", "always-multiline"],
    "new-cap": "off",
    "new-parens": "error",
    "newline-per-chained-call": "off",
    "no-array-constructor": "error",
    "no-bitwise": [
      "error",
      {
        int32Hint: true,
      },
    ],
    "no-continue": "off",
    "no-inline-comments": "off",
    "no-lonely-if": "error",
    "no-mixed-operators": "off",
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-assign": "error",
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-negated-condition": "error",
    "no-nested-ternary": "off",
    "no-new-object": "error",
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    "no-restricted-syntax": "off",
    "no-tabs": "error",
    "no-ternary": "off",
    "no-trailing-spaces": "error",
    "no-underscore-dangle": [
      "error",
      {
        allowAfterThis: true,
        allowAfterSuper: true,
        enforceInMethodNames: false,
      },
    ],
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": ["error", "below"],
    "object-curly-newline": ["error", { multiline: true }],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: true },
    ],
    "one-var": ["error", { initialized: "never", uninitialized: "always" }],
    "one-var-declaration-per-line": "off",
    "operator-assignment": "error",
    "operator-linebreak": ["error", "before"],
    "padded-blocks": ["error", "never"],
    "padding-line-between-statements": "off",
    "quote-props": ["error", "as-needed"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "semi-spacing": ["error", { before: false, after: true }],
    "semi-style": ["error", "last"],
    "sort-keys": "off",
    "sort-vars": "off",
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": ["error", { words: true, nonwords: false }],
    "spaced-comment": "error",
    "switch-colon-spacing": ["error", { after: true, before: false }],
    "template-tag-spacing": ["error", "never"],
    "unicode-bom": ["error", "never"],
    "wrap-regex": "off",
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "constructor-super": "error",
    "generator-star-spacing": ["error", "after"],
    "no-class-assign": "error",
    "no-confusing-arrow": ["error", { allowParens: true }],
    "no-const-assign": "error",
    "no-dupe-class-members": "error",
    "no-duplicate-imports": "error",
    "no-new-symbol": "error",
    "no-restricted-imports": "off",
    "no-this-before-super": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "prefer-const": "error",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "prefer-named-capture-group": "off",
    "prefer-numeric-literals": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "require-yield": "off",
    "rest-spread-spacing": ["error", "always"],
    "sort-imports": "off",
    "symbol-description": "error",
    "template-curly-spacing": ["error", "never"],
    "yield-star-spacing": ["error", "after"],
    "default-param-last": "error",
    "no-import-assign": "error",
    "prefer-regex-literals": "error",
  },
};
