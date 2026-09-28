/* eslint-disable import/first, import/newline-after-import -- 対応関係を示すために */

import type { ESLint, Linter } from "eslint";

type Plugin = ESLint.Plugin;

function assertPlugin(
  plugin: Plugin | null | undefined,
  name: string,
): asserts plugin is Plugin {
  if (plugin == null) {
    throw new TypeError(
      `plugin${name ? ` "${name}"` : ""} is null or undefined`,
    );
  }
}

/**
 * CJSビルドでは、ESモジュールのみのプラグインを require() すると名前空間オブジェクトが
 * 返り、default import がプラグイン本体ではなく名前空間になる。
 * @template T プラグインの型
 */
function interopDefault<T>(mod: T): T {
  if (
    typeof mod === "object" &&
    mod !== null &&
    "default" in mod &&
    !("rules" in mod)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- the namespace's default export is the plugin itself
    return mod.default as T;
  }
  return mod;
}

import pluginTsRaw from "@typescript-eslint/eslint-plugin";
// @ts-expect-error -- its legacy configs allow `parser: null`, which @eslint/core 0.17 types reject
assertPlugin(pluginTsRaw, "@typescript-eslint/eslint-plugin");
export const pluginTs: Plugin = pluginTsRaw;

import pluginCommentsRaw from "@eslint-community/eslint-plugin-eslint-comments";
assertPlugin(
  pluginCommentsRaw,
  "@eslint-community/eslint-plugin-eslint-comments",
);
export const pluginComments: Plugin = pluginCommentsRaw;

import * as pluginImportRaw from "eslint-plugin-import-x";
// @ts-expect-error -- its rule context type still has methods that @eslint/core 0.17 types removed
assertPlugin(pluginImportRaw, "eslint-plugin-import-x");
export const pluginImport: Plugin = pluginImportRaw;

import pluginJestRaw from "eslint-plugin-jest";
assertPlugin(pluginJestRaw, "eslint-plugin-jest");
export const pluginJest = pluginJestRaw;

import * as pluginJestDomRaw from "eslint-plugin-jest-dom";
assertPlugin(pluginJestDomRaw, "eslint-plugin-jest-dom");
export const pluginJestDom = pluginJestDomRaw;

import pluginReactRaw from "eslint-plugin-react";
assertPlugin(pluginReactRaw, "eslint-plugin-react");
export const pluginReact = pluginReactRaw;

import pluginReactHooksRaw from "eslint-plugin-react-hooks";
assertPlugin(pluginReactHooksRaw, "eslint-plugin-react-hooks");
export const pluginReactHooks: Plugin = pluginReactHooksRaw;

import pluginReactYouMightNotNeedAnEffectRaw from "eslint-plugin-react-you-might-not-need-an-effect";
assertPlugin(
  pluginReactYouMightNotNeedAnEffectRaw,
  "eslint-plugin-react-you-might-not-need-an-effect",
);
export const pluginReactYouMightNotNeedAnEffect: Plugin =
  pluginReactYouMightNotNeedAnEffectRaw;

import pluginNodeRaw from "eslint-plugin-n";
assertPlugin(pluginNodeRaw, "eslint-plugin-n");
export const pluginNode: Plugin = pluginNodeRaw;

// @ts-expect-error -- no type definition
import pluginPromiseRaw from "eslint-plugin-promise";
assertPlugin(pluginPromiseRaw, "eslint-plugin-promise");
export const pluginPromise: Plugin = pluginPromiseRaw;

import pluginUnicornRaw from "eslint-plugin-unicorn";
const pluginUnicornDefault = interopDefault(pluginUnicornRaw);
assertPlugin(pluginUnicornDefault, "eslint-plugin-unicorn");
export const pluginUnicorn: Plugin = pluginUnicornDefault;

import pluginMarkdownRaw from "@eslint/markdown";
const pluginMarkdownDefault = interopDefault(pluginMarkdownRaw);
// @ts-expect-error -- its rule context type still has methods that ESLint 10's types removed
assertPlugin(pluginMarkdownDefault, "@eslint/markdown");
export const pluginMarkdown: Plugin = pluginMarkdownDefault;

export { default as pluginJsdoc } from "eslint-plugin-jsdoc";

// @ts-expect-error -- no type definition
import pluginNoOnlyTestsRaw from "eslint-plugin-no-only-tests";
assertPlugin(pluginNoOnlyTestsRaw, "eslint-plugin-no-only-tests");
export const pluginNoOnlyTests: Plugin = pluginNoOnlyTestsRaw;

import pluginTestingLibraryRaw from "eslint-plugin-testing-library";
assertPlugin(pluginTestingLibraryRaw, "eslint-plugin-testing-library");
export const pluginTestingLibrary = pluginTestingLibraryRaw;

// @ts-expect-error -- no type definition
import pluginJsxA11yRaw from "eslint-plugin-jsx-a11y";
assertPlugin(pluginJsxA11yRaw, "eslint-plugin-jsx-a11y");
export const pluginJsxA11y: Plugin = pluginJsxA11yRaw;

import pluginJsoncRaw from "eslint-plugin-jsonc";
assertPlugin(pluginJsoncRaw, "eslint-plugin-jsonc");
export const pluginJsonc: Plugin = pluginJsoncRaw;

export { default as pluginVitest } from "@vitest/eslint-plugin";

export * as parserTs from "@typescript-eslint/parser";

export * as parserJsonc from "jsonc-eslint-parser";

export { default as configPrettier } from "eslint-config-prettier";

import configFlatGitIgnoreRaw from "eslint-config-flat-gitignore";
export const configFlatGitIgnore = interopDefault(configFlatGitIgnoreRaw);
