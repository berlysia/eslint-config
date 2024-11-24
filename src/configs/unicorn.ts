import { GLOB_SRC } from "../globs";
import { pluginUnicorn } from "../plugins";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsUnicorn(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:unicorn",
      files: [GLOB_SRC],
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: {
        "unicorn/better-regex": "error",
        "unicorn/catch-error-name": "error",
        "unicorn/consistent-destructuring": "off",
        "unicorn/consistent-function-scoping": "error",
        "unicorn/custom-error-definition": "error",
        "unicorn/empty-brace-spaces": "error",
        "unicorn/error-message": "error",
        "unicorn/escape-case": "error",
        "unicorn/expiring-todo-comments": "error",
        "unicorn/explicit-length-check": "error",
        "unicorn/filename-case": "off",
        "unicorn/import-style": "error",
        "unicorn/new-for-builtins": "error",
        "unicorn/no-abusive-eslint-disable": "error",
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-array-for-each": "error",
        "unicorn/no-array-method-this-argument": "error",
        "unicorn/no-array-push-push": "error",
        "unicorn/no-array-reduce": "off",
        "unicorn/no-await-expression-member": "error",
        "unicorn/no-console-spaces": "error",
        "unicorn/no-document-cookie": "error",
        "unicorn/no-empty-file": "error",
        "unicorn/no-for-loop": "error",
        "unicorn/no-hex-escape": "error",
        "unicorn/no-instanceof-array": "error",
        "unicorn/no-invalid-remove-event-listener": "error",
        "unicorn/no-keyword-prefix": "off",
        "unicorn/no-lonely-if": "error",
        "no-negated-condition": "off",
        "unicorn/no-negated-condition": "error",
        "no-nested-ternary": "off",
        "unicorn/no-nested-ternary": "error",
        "unicorn/no-new-array": "error",
        "unicorn/no-new-buffer": "error",
        "unicorn/no-null": "off",
        "unicorn/no-object-as-default-parameter": "error",
        "unicorn/no-process-exit": "error",
        "unicorn/no-static-only-class": "error",
        "unicorn/no-thenable": "error",
        "unicorn/no-this-assignment": "error",
        "unicorn/no-typeof-undefined": "error",
        "unicorn/no-unnecessary-await": "error",
        "unicorn/no-unreadable-array-destructuring": "error",
        "unicorn/no-unreadable-iife": "error",
        "unicorn/no-unused-properties": "off",
        "unicorn/no-useless-fallback-in-spread": "error",
        "unicorn/no-useless-length-check": "error",
        "unicorn/no-useless-promise-resolve-reject": "error",
        "unicorn/no-useless-spread": "error",
        "unicorn/no-useless-switch-case": "error",
        "unicorn/no-useless-undefined": "error",
        "unicorn/no-zero-fractions": "error",
        "unicorn/number-literal-case": "error",
        "unicorn/numeric-separators-style": "error",
        "unicorn/prefer-add-event-listener": "error",
        "unicorn/prefer-array-find": "error",
        "unicorn/prefer-array-flat": "error",
        "unicorn/prefer-array-flat-map": "error",
        "unicorn/prefer-array-index-of": "error",
        "unicorn/prefer-array-some": "error",
        "unicorn/prefer-at": "error",
        "unicorn/prefer-code-point": "error",
        "unicorn/prefer-date-now": "error",
        "unicorn/prefer-default-parameters": "error",
        "unicorn/prefer-dom-node-append": "error",
        "unicorn/prefer-dom-node-dataset": "error",
        "unicorn/prefer-dom-node-remove": "error",
        "unicorn/prefer-dom-node-text-content": "error",
        "unicorn/prefer-event-target": "error",
        "unicorn/prefer-export-from": ["error", { ignoreUsedVariables: true }],
        "unicorn/prefer-includes": "error",
        "unicorn/prefer-json-parse-buffer": "error",
        "unicorn/prefer-keyboard-event-key": "error",
        "unicorn/prefer-logical-operator-over-ternary": "error",
        "unicorn/prefer-math-trunc": "error",
        "unicorn/prefer-modern-dom-apis": "error",
        "unicorn/prefer-modern-math-apis": "error",
        "unicorn/prefer-module": "error",
        "unicorn/prefer-native-coercion-functions": "error",
        "unicorn/prefer-negative-index": "error",
        "unicorn/prefer-node-protocol": "error",
        "unicorn/prefer-number-properties": "error",
        "unicorn/prefer-object-from-entries": "error",
        "unicorn/prefer-optional-catch-binding": "error",
        "unicorn/prefer-prototype-methods": "error",
        "unicorn/prefer-query-selector": "error",
        "unicorn/prefer-reflect-apply": "error",
        "unicorn/prefer-regexp-test": "error",
        "unicorn/prefer-set-has": "error",
        "unicorn/prefer-set-size": "error",
        "unicorn/prefer-spread": "error",
        "unicorn/prefer-string-replace-all": "error",
        "unicorn/prefer-string-slice": "error",
        "unicorn/prefer-string-starts-ends-with": "error",
        "unicorn/prefer-string-trim-start-end": "error",
        "unicorn/prefer-switch": "error",
        "unicorn/prefer-ternary": "error",
        "unicorn/prefer-top-level-await": "error",
        "unicorn/prefer-type-error": "error",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/relative-url-style": "error",
        "unicorn/require-array-join-separator": "error",
        "unicorn/require-number-to-fixed-digits-argument": "error",
        "unicorn/require-post-message-target-origin": "off",
        "unicorn/string-content": "off",
        "unicorn/switch-case-braces": "error",
        "unicorn/template-indent": "error",
        "unicorn/text-encoding-identifier-case": "error",
        "unicorn/throw-new-error": "error",
        "unicorn/prefer-blob-reading-methods": "error",
        "unicorn/no-unnecessary-polyfills": "error",
        "unicorn/consistent-empty-array-spread": "error",
        "unicorn/no-anonymous-default-export": "error",
        "unicorn/no-await-in-promise-methods": "error",
        "unicorn/no-invalid-fetch-options": "error",
        "unicorn/no-magic-array-flat-depth": "error",
        "unicorn/no-negation-in-equality-check": "error",
        "unicorn/no-single-promise-in-promise-methods": "error",
        "unicorn/prefer-string-raw": "error",
        "unicorn/prefer-structured-clone": "error",
        "unicorn/no-length-as-slice-end": "error",
        "unicorn/consistent-existence-index-check": "error",
        "unicorn/prefer-global-this": "off",
        "unicorn/prefer-math-min-max": "error",

        ...options.overrides,
      },
    },
  ];
}
