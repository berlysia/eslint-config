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
import { rulesTest, rulesTestTypeScript } from "../rules/test";
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
      rules: rulesTest(options),
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
      rules: rulesTestTypeScript(),
    });
  }

  return configs;
}
