/* eslint-disable import/first, import/newline-after-import, unicorn/prefer-export-from -- we need cast */
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

// @ts-expect-error -- no type definition
import * as pluginImportRaw from "eslint-plugin-i";
assertPlugin(pluginImportRaw, "eslint-plugin-i");
export const pluginImport = pluginImportRaw;

// @ts-expect-error -- no type definition
import pluginJestRaw from "eslint-plugin-jest";
assertPlugin(pluginJestRaw, "eslint-plugin-jest");
export const pluginJest = pluginJestRaw;

// @ts-expect-error -- no type definition
import * as pluginJestDomRaw from "eslint-plugin-jest-dom";
assertPlugin(pluginJestDomRaw, "eslint-plugin-jest-dom");
export const pluginJestDom = pluginJestDomRaw;

// @ts-expect-error -- no type definition
import pluginReactRaw from "eslint-plugin-react";
assertPlugin(pluginReactRaw, "eslint-plugin-react");
export const pluginReact = pluginReactRaw;

// @ts-expect-error -- no type definition
import pluginReactHooksRaw from "eslint-plugin-react-hooks";
assertPlugin(pluginReactHooksRaw, "eslint-plugin-react-hooks");
export const pluginReactHooks = pluginReactHooksRaw;

import * as pluginSonarJsRaw from "eslint-plugin-sonarjs";
assertPlugin(pluginSonarJsRaw, "eslint-plugin-sonarjs");
export const pluginSonarJs = pluginSonarJsRaw;

// @ts-expect-error -- no type definition
import pluginNodeRaw from "eslint-plugin-n";
assertPlugin(pluginNodeRaw, "eslint-plugin-n");
export const pluginNode = pluginNodeRaw;

// @ts-expect-error -- no type definition
import pluginPromiseRaw from "eslint-plugin-promise";
assertPlugin(pluginPromiseRaw, "eslint-plugin-promise");
export const pluginPromise = pluginPromiseRaw;

// @ts-expect-error -- no type definition
import pluginUnicornRaw from "eslint-plugin-unicorn";
assertPlugin(pluginUnicornRaw, "eslint-plugin-unicorn");
export const pluginUnicorn = pluginUnicornRaw;

// @ts-expect-error -- no type definition
import pluginMarkdownRaw from "eslint-plugin-markdown";
assertPlugin(pluginMarkdownRaw, "eslint-plugin-markdown");
export const pluginMarkdown = pluginMarkdownRaw;

import pluginJsdocRaw from "eslint-plugin-jsdoc";
export const pluginJsdoc = pluginJsdocRaw;

// @ts-expect-error -- no type definition
import pluginNoOnlyTestsRaw from "eslint-plugin-no-only-tests";
assertPlugin(pluginNoOnlyTestsRaw, "eslint-plugin-no-only-tests");
export const pluginNoOnlyTests = pluginNoOnlyTestsRaw;

// @ts-expect-error -- no type definition
import pluginTestingLibraryRaw from "eslint-plugin-testing-library";
assertPlugin(pluginTestingLibraryRaw, "eslint-plugin-testing-library");
export const pluginTestingLibrary = pluginTestingLibraryRaw;

// @ts-expect-error -- no type definition
import pluginJsxA11yRaw from "eslint-plugin-jsx-a11y";
assertPlugin(pluginJsxA11yRaw, "eslint-plugin-jsx-a11y");
export const pluginJsxA11y = pluginJsxA11yRaw;

export { default as pluginJsonc } from "eslint-plugin-jsonc";
export { default as pluginVitest } from "eslint-plugin-vitest";

export * as parserTs from "@typescript-eslint/parser";

export * as parserJsonc from "jsonc-eslint-parser";

// @ts-expect-error -- no type definition
import configPrettierRaw from "eslint-config-prettier";

export { default as configFlatGitIgnore } from "eslint-config-flat-gitignore";

export const configPrettier = configPrettierRaw as {
  rules: Linter.RulesRecord;
};
