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

export { default as pluginTs } from "@typescript-eslint/eslint-plugin";

// @ts-expect-error -- no type definition
import pluginCommentsRaw from "eslint-plugin-eslint-comments";
assertPlugin(pluginCommentsRaw, "eslint-plugin-eslint-comments");
export const pluginComments = pluginCommentsRaw;

import * as pluginImportRaw from "eslint-plugin-import-x";
// @ts-expect-error -- something wrong
assertPlugin(pluginImportRaw, "eslint-plugin-import-x");
export const pluginImport: Plugin = pluginImportRaw;

import pluginJestRaw from "eslint-plugin-jest";
assertPlugin(pluginJestRaw, "eslint-plugin-jest");
export const pluginJest = pluginJestRaw;

import * as pluginJestDomRaw from "eslint-plugin-jest-dom";
assertPlugin(pluginJestDomRaw, "eslint-plugin-jest-dom");
export const pluginJestDom = pluginJestDomRaw;

import pluginReactRaw from "eslint-plugin-react";
// @ts-expect-error -- something wrong
assertPlugin(pluginReactRaw, "eslint-plugin-react");
export const pluginReact = pluginReactRaw;

// @ts-expect-error -- no type definition
import pluginReactHooksRaw from "eslint-plugin-react-hooks";
assertPlugin(pluginReactHooksRaw, "eslint-plugin-react-hooks");
export const pluginReactHooks = pluginReactHooksRaw;

import pluginNodeRaw from "eslint-plugin-n";
assertPlugin(pluginNodeRaw, "eslint-plugin-n");
export const pluginNode = pluginNodeRaw;

// @ts-expect-error -- no type definition
import pluginPromiseRaw from "eslint-plugin-promise";
assertPlugin(pluginPromiseRaw, "eslint-plugin-promise");
export const pluginPromise = pluginPromiseRaw;

import pluginUnicornRaw from "eslint-plugin-unicorn";
assertPlugin(pluginUnicornRaw, "eslint-plugin-unicorn");
export const pluginUnicorn = pluginUnicornRaw;

// @ts-expect-error -- no type definition
import pluginMarkdownRaw from "eslint-plugin-markdown";
assertPlugin(pluginMarkdownRaw, "eslint-plugin-markdown");
export const pluginMarkdown = pluginMarkdownRaw;

export { default as pluginJsdoc } from "eslint-plugin-jsdoc";

// @ts-expect-error -- no type definition
import pluginNoOnlyTestsRaw from "eslint-plugin-no-only-tests";
assertPlugin(pluginNoOnlyTestsRaw, "eslint-plugin-no-only-tests");
export const pluginNoOnlyTests = pluginNoOnlyTestsRaw;

import pluginTestingLibraryRaw from "eslint-plugin-testing-library";
assertPlugin(pluginTestingLibraryRaw, "eslint-plugin-testing-library");
export const pluginTestingLibrary = pluginTestingLibraryRaw;

// @ts-expect-error -- no type definition
import pluginJsxA11yRaw from "eslint-plugin-jsx-a11y";
assertPlugin(pluginJsxA11yRaw, "eslint-plugin-jsx-a11y");
export const pluginJsxA11y = pluginJsxA11yRaw;

export { default as pluginJsonc } from "eslint-plugin-jsonc";
export { default as pluginVitest } from "@vitest/eslint-plugin";

export * as parserTs from "@typescript-eslint/parser";

export * as parserJsonc from "jsonc-eslint-parser";

// @ts-expect-error -- no type definition
export { default as configPrettier } from "eslint-config-prettier";

export { default as configFlatGitIgnore } from "eslint-config-flat-gitignore";
