import { GLOB_TESTS } from "../globs";
import {
  pluginJest,
  pluginNoOnlyTests,
  pluginTestingLibrary,
  pluginTs,
  pluginVitest,
} from "../plugins";
import type {
  FlatConfigItem,
  OptionsIsInEditor,
  OptionsTestLibrary,
  OptionsUseTypeScript,
} from "../types";

function getTestPlugin(options: OptionsTestLibrary) {
  switch (options.testLibrary) {
    case "jest": {
      return pluginJest;
    }
    case "vitest": {
      return pluginVitest;
    }
    default: {
      throw new Error(`invalid testLibrary: ${options.testLibrary}`);
    }
  }
}

export default function configsTest(
  options: OptionsUseTypeScript & OptionsTestLibrary & OptionsIsInEditor,
): FlatConfigItem[] {
  const pluginTest = getTestPlugin(options);
  const configs: FlatConfigItem[] = [
    {
      name: "berlysia:test:setup",
      plugins: {
        test: {
          ...pluginTest,
          rules: {
            ...pluginTest.rules,
            ...pluginNoOnlyTests.rules,
          },
        },
        "testing-library": pluginTestingLibrary,
      },
    },
    {
      name: "berlysia:test",
      files: GLOB_TESTS,
      rules: {
        "test/no-only-tests": options.isInEditor ? "off" : "error",
        "test/consistent-test-it": "error",
        "test/expect-expect": "off",
        "test/no-alias-methods": "error",
        "test/no-commented-out-tests": "error",
        "test/no-disabled-tests": "warn",
        "test/no-duplicate-hooks": "error",
        "test/no-focused-tests": "error",
        "test/no-hooks": "off",
        "test/no-identical-title": "error",
        "test/no-large-snapshots": ["error", { maxSize: 32 }],
        "test/no-mocks-import": "error",
        "test/no-standalone-expect": "error",
        "test/no-test-prefixes": "error",
        "test/no-test-return-statement": "error",
        "test/prefer-called-with": "error",
        "test/prefer-spy-on": "warn",
        "test/prefer-strict-equal": "error",
        "test/prefer-to-contain": "error",
        "test/prefer-to-have-length": "error",
        "test/prefer-todo": "warn",
        "test/prefer-hooks-on-top": "error",
        "test/require-top-level-describe": "off", // トップレベルにtestを書かせろ
        "test/require-to-throw-message": "error",
        "test/valid-expect": "error",
        "test/valid-title": "off",
        "test/no-conditional-expect": "error",
        "test/no-done-callback": "error",
        "test/no-interpolation-in-snapshots": "error",
        "test/no-restricted-matchers": "error",
        "test/max-nested-describe": "off",
        "test/prefer-comparison-matcher": "error",
        "test/prefer-equality-matcher": "error",
        "test/prefer-expect-resolves": "error",
        "test/prefer-lowercase-title": "off", // 日本語で書くので関心なし
        "test/prefer-to-be": "error",
        "test/require-hook": "error",
        "test/valid-describe-callback": "error",
        "test/max-expects": "off",
        "test/no-conditional-in-test": "error",
        "test/prefer-each": "error",
        "test/prefer-hooks-in-order": "error",
        "test/prefer-mock-promise-shorthand": "error",
        "test/prefer-snapshot-hint": ["error", "multi"],

        ...(options.testLibrary === "vitest"
          ? {
              "test/no-conditional-tests": "error",
              "test/no-restricted-vi-methods": "off",
              "test/consistent-test-filename": "error",
              "test/prefer-to-be-falsy": "error",
              "test/prefer-to-be-object": "error",
              "test/prefer-to-be-truthy": "error",
            }
          : {}),

        ...(options.testLibrary === "jest"
          ? {
              "test/no-export": "off",
              "test/no-jasmine-globals": "error",
              "test/no-deprecated-functions": "error",
              "test/prefer-expect-assertions": "off",
              "test/valid-expect-in-promise": "error",
              "test/no-restricted-jest-methods": "off",
              "test/no-confusing-set-timeout": "off",
              "test/unbound-method": "off", // configure in `jest-and-typescript`
              "test/no-untyped-mock-factory": "off", // configure in `jest-and-typescript`
            }
          : {}),

        "testing-library/await-async-events": "error",
        "testing-library/await-async-queries": "error",
        "testing-library/await-async-utils": "error",
        "testing-library/consistent-data-testid": "off",
        "testing-library/no-await-sync-events": "error",
        "testing-library/no-await-sync-queries": "error",
        "testing-library/no-container": "error",
        "testing-library/no-debugging-utils": options.isInEditor
          ? "off"
          : "error",
        "testing-library/no-dom-import": "error",
        "testing-library/no-global-regexp-flag-in-query": "error",
        "testing-library/no-manual-cleanup": "error",
        "testing-library/no-node-access": "error",
        "testing-library/no-promise-in-fire-event": "error",
        "testing-library/no-render-in-lifecycle": "error",
        "testing-library/no-unnecessary-act": "error",
        "testing-library/no-wait-for-multiple-assertions": "error",
        "testing-library/no-wait-for-side-effects": "error",
        "testing-library/no-wait-for-snapshot": "error",
        "testing-library/prefer-explicit-assert": "off",
        "testing-library/prefer-find-by": "error",
        "testing-library/prefer-implicit-assert": "error",
        "testing-library/prefer-presence-queries": "error",
        "testing-library/prefer-query-by-disappearance": "error",
        "testing-library/prefer-query-matchers": "off",
        "testing-library/prefer-screen-queries": "error",
        "testing-library/prefer-user-event": "error",
        "testing-library/render-result-naming-convention": "error",
      },
    },
  ];

  if (options.useTypeScript && options.testLibrary === "jest") {
    configs.push({
      name: "berlysia:test-and-typescript",
      files: GLOB_TESTS,
      plugins: {
        "@typescript-eslint": pluginTs,
      },
      rules: {
        "@typescript-eslint/unbound-method": "off",
        "test/unbound-method": "error",
        "test/no-untyped-mock-factory": "error",
      },
    });
  }

  return configs;
}
