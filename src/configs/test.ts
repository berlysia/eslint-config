import type { ParserOptions } from "@typescript-eslint/parser";
import type { ESLint } from "eslint";
import { GLOB_TESTS } from "../globs";
import {
  parserTs,
  pluginJest,
  pluginJestDom,
  pluginNoOnlyTests,
  pluginTestingLibrary,
  pluginTs,
  pluginVitest,
} from "../plugins";
import type {
  FlatConfigItem,
  OptionsIsInEditor,
  OptionsOverride,
  OptionsTestLibrary,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptTsConfigPath,
} from "../types";

const vitestToJest = [
  "prefer-to-be-falsy",
  "prefer-to-be-object",
  "prefer-to-be-truthy",
  "no-import-node-test",
  "consistent-test-filename",
] as const;

const jestToVitest = ["valid-expect-in-promise"] as const;

function getTestPlugin(options: OptionsTestLibrary) {
  switch (options.testLibrary) {
    case "jest": {
      return {
        ...pluginJest,
        rules: {
          ...pluginJest.rules,
          ...Object.fromEntries(
            vitestToJest.map((key) => [key, pluginVitest.rules[key]]),
          ),
        },
      };
    }
    case "vitest": {
      return {
        ...pluginVitest,
        rules: {
          ...pluginVitest.rules,
          ...Object.fromEntries(
            jestToVitest.map((key) => [key, pluginJest.rules[key]]),
          ),
        },
      };
    }
    default: {
      throw new Error(`invalid testLibrary: ${options.testLibrary}`);
    }
  }
}

export default function configsTest(
  options: OptionsTypeScriptParserOptions &
    OptionsTypeScriptTsConfigPath &
    OptionsTestLibrary &
    OptionsIsInEditor &
    OptionsOverride,
): FlatConfigItem[] {
  const pluginTest = getTestPlugin(options);
  const configs: FlatConfigItem[] = [
    {
      name: "berlysia:test:setup",
      plugins: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- ESLint 9.39の型定義との互換性問題を回避
        test: {
          ...pluginTest,
          rules: {
            ...pluginTest.rules,
            ...pluginNoOnlyTests.rules,
            ...pluginJestDom.rules,
          },
        } as ESLint.Plugin,
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
        "test/prefer-expect-assertions": "off",

        // stylistic
        "test/padding-around-after-all-blocks": "off",
        "test/padding-around-after-each-blocks": "off",
        "test/padding-around-all": "off",
        "test/padding-around-before-all-blocks": "off",
        "test/padding-around-before-each-blocks": "off",
        "test/padding-around-describe-blocks": "off",
        "test/padding-around-expect-groups": "off",
        "test/padding-around-test-blocks": "off",

        // vitestからjestに移植
        "test/prefer-to-be-falsy": "error",
        "test/prefer-to-be-object": "error",
        "test/prefer-to-be-truthy": "error",
        "test/no-import-node-test": "error",
        "test/consistent-test-filename": "error",

        // jestからvitestに移植
        "test/valid-expect-in-promise": "error",

        ...(options.testLibrary === "vitest"
          ? {
              "test/no-conditional-tests": "error",
              "test/no-restricted-vi-methods": "off",
              "test/require-local-test-context-for-concurrent-snapshots":
                "error",
              "test/prefer-vi-mocked": "error",
              "test/hoisted-apis-on-top": "error",
              "test/consistent-vitest-vi": "error",
              "test/prefer-describe-function-title": "off",
              "test/prefer-strict-boolean-matchers": "error",
              "test/require-mock-type-parameters": "error",
              "test/no-importing-vitest-globals": "off",
              "test/prefer-importing-vitest-globals": "error",
              "test/prefer-called-once": "error",
              "test/prefer-called-times": "error",
              "test/prefer-expect-type-of": "error",
              "test/warn-todo": "warn",
              "test/prefer-import-in-mock": "error",
              "test/prefer-called-exactly-once-with": "error",
              "test/consistent-each-for": "error",
              "test/no-unneeded-async-expect-function": "error",
              "test/prefer-mock-return-shorthand": "error",
              "test/prefer-to-have-been-called-times": "error",
              "test/require-awaited-expect-poll": "error",
              "test/require-test-timeout": "off",
            }
          : {}),

        ...(options.testLibrary === "jest"
          ? {
              "test/no-deprecated-functions": "error",
              "test/no-jasmine-globals": "error",
              "test/unbound-method": "off", // configure in `jest-and-typescript`
              "test/no-untyped-mock-factory": "off", // configure in `jest-and-typescript`
              "test/no-export": "off",
              "test/no-restricted-jest-methods": "off",
              "test/no-confusing-set-timeout": "off",
              "test/no-done-callback": "error",
              "test/prefer-importing-jest-globals": "error",
              "test/prefer-jest-mocked": "error",
              "test/prefer-ending-with-an-expect": "off",
            }
          : {}),

        // jest-dom
        "test/prefer-checked": "error",
        "test/prefer-empty": "error",
        "test/prefer-enabled-disabled": "error",
        "test/prefer-focus": "error",
        "test/prefer-in-document": "error",
        "test/prefer-required": "error",
        "test/prefer-to-have-attribute": "error",
        "test/prefer-to-have-class": "error",
        "test/prefer-to-have-style": "error",
        "test/prefer-to-have-text-content": "error",
        "test/prefer-to-have-value": "error",

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

        ...options.overrides,
      },
    },
  ];

  const tsConfigPath = options.tsConfigPath
    ? [options.tsConfigPath].flat()
    : undefined;
  const { parserOptions, testLibrary } = options;
  if ((tsConfigPath || parserOptions) && testLibrary === "jest") {
    configs.push({
      name: "berlysia:test-and-typescript",
      files: GLOB_TESTS,
      plugins: {
        "@typescript-eslint": pluginTs,
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
      rules: {
        "@typescript-eslint/unbound-method": "off",
        "test/unbound-method": "error",
        "test/no-untyped-mock-factory": "error",
      },
    });
  }

  return configs;
}
