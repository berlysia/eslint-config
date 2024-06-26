import globals from "globals";
import type { FlatConfigItem, OptionsOverride } from "../types";
import { GLOB_SRC } from "../globs";

export default function configsCore(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:core",
      files: [GLOB_SRC],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.es2021,
          document: "readonly",
          navigator: "readonly",
          window: "readonly",
        },
        parserOptions: {
          ecmaFeatures: { jsx: true },
          ecmaVersion: "latest",
          sourceType: "module",
        },
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      rules: {
        "max-classes-per-file": ["error", 1],
        "max-lines-per-function": "off", // 分けたくなるまで分けないので黙らせる
        "no-async-promise-executor": "error",
        "no-fallthrough": "error",
        "no-irregular-whitespace": "error",
        "no-misleading-character-class": "error",
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
        "no-constant-condition": "warn",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-empty-character-class": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
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
        "valid-typeof": "error",
        "accessor-pairs": "off",
        "array-callback-return": "error",
        "block-scoped-var": "off", // var is banned
        "class-methods-use-this": "off",
        complexity: "off",
        "consistent-return": "off",
        curly: ["error", "multi-line"],
        "default-case": "off",
        "dot-notation": "error",
        eqeqeq: ["error", "always", { null: "ignore" }],
        "guard-for-in": "error",
        "no-alert": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-div-regex": "error",
        "no-else-return": "error",
        "no-empty-function": "off",
        "no-empty-pattern": "error",
        "no-eq-null": "off", // we need x == null
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
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
        "no-script-url": "error",
        "no-self-assign": ["error", { props: false }],
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "error",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": [
          "error",
          {
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true,
          },
        ],
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-warning-comments": "off",
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
        yoda: ["error", "never", { exceptRange: true }],
        strict: "off",
        "init-declarations": "error",
        "no-delete-var": "error",
        "no-label-var": "error",
        "no-restricted-globals": "off",
        "no-shadow": "off",
        "no-shadow-restricted-names": "error",
        "no-undef": "error",
        "no-undef-init": "error",
        "no-undefined": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "error",
        camelcase: "off",
        "capitalized-comments": "off",
        "consistent-this": "off",
        "func-name-matching": "off",
        "func-names": "off",
        "func-style": ["error", "declaration", { allowArrowFunctions: true }],
        "id-length": "off",
        "id-match": "off",
        "max-depth": ["error", { max: 4 }],
        "max-lines": "off",
        "max-nested-callbacks": "off",
        "max-params": "off",
        "max-statements": "off",
        "new-cap": "off",
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
        "no-multi-assign": "error",
        "no-negated-condition": "error",
        "no-nested-ternary": "off",
        "no-plusplus": "off",
        "no-restricted-syntax": "off",
        "no-ternary": "off",
        "no-underscore-dangle": "off",
        "no-unneeded-ternary": "error",
        "one-var": "off",
        "operator-assignment": "error",
        "sort-keys": "off",
        "sort-vars": "off",
        "unicode-bom": ["error", "never"],
        "arrow-body-style": "off", // 気にしない
        "constructor-super": "error",
        "no-class-assign": "error",
        "no-const-assign": "error",
        "no-dupe-class-members": "error",
        "no-duplicate-imports": "off", // 誤爆が多いので
        "no-restricted-imports": "off",
        "no-this-before-super": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "error",
        "no-useless-rename": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
        "prefer-const": "off", // 一時的に変えたいことがある
        "prefer-destructuring": "off", // どっちでもいい
        "prefer-named-capture-group": "off",
        "prefer-numeric-literals": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "require-yield": "off",

        "sort-imports": "off",
        "symbol-description": "error",
        "default-param-last": "error",
        "no-import-assign": "error",
        "prefer-regex-literals": "error",
        "grouped-accessor-pairs": "error",
        "no-constructor-return": "error",
        "no-dupe-else-if": "error",
        "no-setter-return": "error",
        "prefer-exponentiation-operator": "error",
        "default-case-last": "error",
        "id-denylist": "off",
        "no-loss-of-precision": "error",
        "no-promise-executor-return": "off", // わかって書いてるので不要
        "no-restricted-exports": "off",
        "no-unreachable-loop": "error",
        "no-useless-backreference": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-private-class-members": "error",
        "prefer-object-has-own": "error",
        "no-constant-binary-expression": "error",
        "logical-assignment-operators": "off",
        "no-empty-static-block": "off",
        "no-new-native-nonconstructor": "error",
        "no-object-constructor": "error",
        "no-useless-assignment": "error",

        ...options.overrides,
      },
    },
  ];
}
