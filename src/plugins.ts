/* eslint-disable import/first, import/newline-after-import, import/no-namespace -- we need cast */
import type { ESLint, Linter } from "eslint";

type Plugin = ESLint.Plugin;

export { default as pluginTs } from "@typescript-eslint/eslint-plugin";

// @ts-expect-error -- no type definition
import pluginCommentsRaw from "eslint-plugin-eslint-comments";
export const pluginComments = pluginCommentsRaw as Plugin;

// @ts-expect-error -- no type definition
import * as pluginImportRaw from "eslint-plugin-i";
export const pluginImport = pluginImportRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginJestRaw from "eslint-plugin-jest";
export const pluginJest = pluginJestRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginReactRaw from "eslint-plugin-react";
export const pluginReact = pluginReactRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginReactHooksRaw from "eslint-plugin-react-hooks";
export const pluginReactHooks = pluginReactHooksRaw as Plugin;

export * as pluginSonarJs from "eslint-plugin-sonarjs";

// @ts-expect-error -- no type definition
import pluginNodeRaw from "eslint-plugin-n";
export const pluginNode = pluginNodeRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginPromiseRaw from "eslint-plugin-promise";
export const pluginPromise = pluginPromiseRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginUnicornRaw from "eslint-plugin-unicorn";
export const pluginUnicorn = pluginUnicornRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginMarkdownRaw from "eslint-plugin-markdown";
export const pluginMarkdown = pluginMarkdownRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginJsdocRaw from "eslint-plugin-jsdoc";
export const pluginJsdoc = pluginJsdocRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginNoOnlyTestsRaw from "eslint-plugin-no-only-tests";
export const pluginNoOnlyTests = pluginNoOnlyTestsRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginTestingLibraryRaw from "eslint-plugin-testing-library";
export const pluginTestingLibrary = pluginTestingLibraryRaw as Plugin;

// @ts-expect-error -- no type definition
import pluginJsxA11yRaw from "eslint-plugin-jsx-a11y";
export const pluginJsxA11y = pluginJsxA11yRaw as Plugin;

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
