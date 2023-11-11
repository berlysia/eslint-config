import { GLOB_TESTS } from "../globs";
import { pluginJest, pluginTs } from "../plugins";
import type { FlatConfigItem, OptionsUseTypeScript } from "../types";
import { readTsConfigPath } from "../utils";

export default function configsJest(
  options?: OptionsUseTypeScript
): FlatConfigItem[] {
  const configs: FlatConfigItem[] = [
    {
      name: "berlysia:jest",
      files: GLOB_TESTS,
      plugins: {
        jest: pluginJest,
      },
      rules: {
        "jest/consistent-test-it": "error",
        "jest/expect-expect": "off",
        "jest/no-alias-methods": "error",
        "jest/no-commented-out-tests": "error",
        "jest/no-disabled-tests": "warn",
        "jest/no-duplicate-hooks": "error",
        "jest/no-export": "error",
        "jest/no-focused-tests": "error",
        "jest/no-hooks": "off",
        "jest/no-if": "error",
        "jest/no-identical-title": "error",
        "jest/no-jasmine-globals": "error",
        "jest/no-large-snapshots": ["error", { maxSize: 32 }],
        "jest/no-mocks-import": "error",
        "jest/no-standalone-expect": "error",
        "jest/no-test-prefixes": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-called-with": "error",
        "jest/prefer-expect-assertions": "off",
        "jest/prefer-spy-on": "warn",
        "jest/prefer-strict-equal": "error",
        "jest/prefer-to-contain": "error",
        "jest/prefer-to-have-length": "error",
        "jest/prefer-todo": "warn",
        "jest/prefer-hooks-on-top": "error",
        "jest/require-top-level-describe": "off", // トップレベルにtestを書かせろ
        "jest/require-to-throw-message": "error",
        "jest/valid-expect": "error",
        "jest/valid-expect-in-promise": "error",
        "jest/valid-title": "off",
        "jest/no-conditional-expect": "error",
        "jest/no-deprecated-functions": "error",
        "jest/no-done-callback": "error",
        "jest/no-interpolation-in-snapshots": "error",
        "jest/no-restricted-matchers": "error",
        "jest/unbound-method": "off", // configure in `jest-and-typescript`
        "jest/max-nested-describe": "off",
        "jest/prefer-comparison-matcher": "error",
        "jest/prefer-equality-matcher": "error",
        "jest/prefer-expect-resolves": "error",
        "jest/prefer-lowercase-title": "off", // 日本語で書くので関心なし
        "jest/prefer-to-be": "error",
        "jest/require-hook": "error",
        "jest/valid-describe-callback": "error",
        "jest/max-expects": "off",
        "jest/no-conditional-in-test": "error",
        "jest/prefer-each": "error",
        "jest/prefer-hooks-in-order": "error",
        "jest/prefer-mock-promise-shorthand": "error",
        "jest/prefer-snapshot-hint": ["error", "multi"],
        "jest/no-restricted-jest-methods": "off", // デフォルトでは指定しない
        "jest/no-untyped-mock-factory": "off", // configure in `jest-and-typescript`
        "jest/no-confusing-set-timeout": "error",
      },
    },
  ];

  if (options?.useTypeScript) {
    configs.push({
      name: "berlysia:jest-and-typescript",
      files: GLOB_TESTS,
      plugins: {
        "@typescript-eslint": pluginTs,
      },
      rules: {
        "@typescript-eslint/unbound-method": "off",
        "jest/unbound-method": "error",
        "jest/no-untyped-mock-factory": "error",
      },
    });
  }

  return configs;
}
