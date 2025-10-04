import type { ParserOptions } from "eslint-define-config";
import { GLOB_DTS, GLOB_TS, GLOB_TSX } from "../globs";
import { parserTs, pluginImport, pluginTs } from "../plugins";
import type {
  FlatConfigItem,
  OptionsOverride,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptTsConfigPath,
} from "../types";

type Rules = { rules: NonNullable<FlatConfigItem["rules"]> };

export const typeAwareRules: Rules = {
  rules: {
    "@typescript-eslint/await-thenable": "error",
    "dot-notation": "off",
    "@typescript-eslint/dot-notation": ["error"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase"],
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
      },
      {
        selector: ["variable", "parameter"],
        types: ["boolean"],
        format: ["camelCase"],
        custom: {
          match: true,
          regex:
            "^(is|should|has|can|did|will|check|allow|ignore|use)|(Is|Should|Has|Can|Did|Will|Check|Allow|Ignore|Use)[A-Z0-9]",
        },
      },
      {
        selector: "parameter",
        format: ["camelCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      {
        selector: ["objectLiteralProperty", "typeProperty"],
        format: null,
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase" /* Components */],
      },
    ],
    "@typescript-eslint/no-base-to-string": "error",
    "no-void": "off", // no-floating-promises で void を使うので無効化
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-implied-eval": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": [
      "error",
      {
        ignoreConditionalTests: true,
        ignoreMixedLogicalExpressions: true,
      },
    ],
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-readonly-parameter-types": "off", // やりたいが、しんどい
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
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
    "@typescript-eslint/return-await": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "@typescript-eslint/restrict-template-expressions": [
      "error",
      {
        allowAny: true,
        allowBoolean: true,
        allowNever: true,
        allowNullish: false,
        allowNumber: true,
        allowRegExp: true,
      },
    ],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/unbound-method": [
      "error",
      {
        ignoreStatic: true,
      },
    ],
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/no-meaningless-void-operator": "error",
    "@typescript-eslint/prefer-return-this-type": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/no-redundant-type-constituents": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "error",
    "@typescript-eslint/no-mixed-enums": "error",
    "@typescript-eslint/no-unsafe-enum-comparison": "error",
    "@typescript-eslint/prefer-destructuring": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-unsafe-unary-minus": "error",
    "@typescript-eslint/no-array-delete": "error",
    "prefer-promise-reject-errors": "off",
    "@typescript-eslint/prefer-promise-reject-errors": [
      "error",
      {
        allowEmptyReject: true,
      },
    ],
    "@typescript-eslint/prefer-find": "error",
    "@typescript-eslint/consistent-return": [
      "error",
      { treatUndefinedAsUnspecified: true },
    ],
    "@typescript-eslint/use-unknown-in-catch-callback-variable": "error",
    "@typescript-eslint/no-unnecessary-template-expression": "error",
    "@typescript-eslint/only-throw-error": "error",
    "@typescript-eslint/no-unnecessary-type-parameters": "error",

    "@typescript-eslint/no-deprecated": "error",
    "@typescript-eslint/no-unsafe-type-assertion": "error",
    "@typescript-eslint/related-getter-setter-pairs": "error",
    "@typescript-eslint/no-misused-spread": "error",
    "@typescript-eslint/no-unnecessary-type-conversion": "error",
  },
};

export const nonTypeAwareRules: Rules = {
  rules: {
    "no-undef": "off",
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        minimumDescriptionLength: 3,
        "ts-check": false,
        "ts-expect-error": "allow-with-description",
        "ts-ignore": true,
        "ts-nocheck": true,
      },
    ],
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/class-literal-property-style": ["error", "fields"],
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/default-param-last": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "init-declarations": "off",
    "@typescript-eslint/init-declarations": ["error"],
    "@typescript-eslint/member-ordering": "off",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "no-dupe-class-members": "off",
    "@typescript-eslint/no-dupe-class-members": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-extraneous-class": "error",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "no-invalid-this": "off",
    "@typescript-eslint/no-invalid-this": [
      "error",
      { capIsConstructor: false },
    ],
    "@typescript-eslint/no-invalid-void-type": "error",
    "@typescript-eslint/no-magic-numbers": "off",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-namespace": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-this-alias": "error",
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
    "@typescript-eslint/no-unused-vars": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off", // 完全に理解しているので不要
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/prefer-as-const": "error",
    "@typescript-eslint/prefer-for-of": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-literal-enum-member": "error",
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "@typescript-eslint/triple-slash-reference": [
      "error",
      { path: "never", types: "never", lib: "never" },
    ],
    "@typescript-eslint/typedef": "off",
    "@typescript-eslint/unified-signatures": "off",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-loop-func": "error",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": "off",
    "@typescript-eslint/consistent-generic-constructors": [
      "error",
      "constructor",
    ],
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "@typescript-eslint/parameter-properties": "error",
    "@typescript-eslint/no-unsafe-declaration-merging": "error",
    "@typescript-eslint/sort-type-constituents": "off", // グループ別ならうれしいがキー名はおせっかい
    "class-methods-use-this": "off",
    "@typescript-eslint/class-methods-use-this": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",
    "max-params": "off",
    "@typescript-eslint/max-params": "off",
    "@typescript-eslint/no-empty-object-type": "error",
    "@typescript-eslint/no-restricted-types": "error",
    "@typescript-eslint/no-unnecessary-parameter-property-assignment": "error",
    "@typescript-eslint/no-unsafe-function-type": "error",
    "@typescript-eslint/no-wrapper-object-types": "error",
  },
};

export default function configsTypeScript(
  options: OptionsTypeScriptTsConfigPath &
    OptionsTypeScriptParserOptions &
    OptionsOverride,
): FlatConfigItem[] {
  const tsConfigPath = options.tsConfigPath
    ? [options.tsConfigPath].flat()
    : undefined;
  const { parserOptions, overrides } = options;

  return [
    {
      name: "berlysia:typescript",
      files: [GLOB_TS, GLOB_TSX],
      ignores: [GLOB_DTS],
      plugins: {
        "@typescript-eslint": pluginTs,
        import: pluginImport,
      },
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          warnOnUnsupportedTypeScriptVersion: false,
          sourceType: "module",
          ...(tsConfigPath
            ? { project: tsConfigPath, tsconfigRootDir: process.cwd() }
            : {}),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- TS plugins parserOptions type is more specialized
          ...(parserOptions as ParserOptions),
        },
      },

      settings: {
        "import-x/resolver": {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        ...nonTypeAwareRules.rules,
        ...(tsConfigPath ? typeAwareRules.rules : {}),

        ...overrides,
      },
    },
  ];
}
