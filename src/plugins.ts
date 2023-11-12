/* eslint-disable import/first, import/newline-after-import, import/no-namespace -- we need cast */
import type { ESLint, Linter } from "eslint";

type Plugin = ESLint.Plugin;

export { default as pluginTs } from "@typescript-eslint/eslint-plugin";

// @ts-expect-error -- no type definition
import pluginCommentsRaw from "eslint-plugin-eslint-comments";
export const pluginComments = pluginCommentsRaw as Plugin;

// @ts-expect-error -- no type definition
import * as pluginImportRaw from "eslint-plugin-import";
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

export { default as pluginSonarJs } from "eslint-plugin-sonarjs";

// @ts-expect-error -- no type definition
import pluginUnicornRaw from "eslint-plugin-unicorn";
export const pluginUnicorn = pluginUnicornRaw as Plugin;

export * as parserTs from "@typescript-eslint/parser";

// @ts-expect-error -- no type definition
import configPrettierRaw from "eslint-config-prettier";
export const configPrettier = configPrettierRaw as {
  rules: Linter.RulesRecord;
};
