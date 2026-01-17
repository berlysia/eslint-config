/**
 * ESLintプラグインとoxlintプラグインのマッピング
 */

import type { OxlintNativePlugin } from "./types";

/**
 * oxlintのネイティブプラグイン一覧（Rust実装）
 * これらはoxlintに組み込まれており、高速に動作する
 */
export const NATIVE_PLUGINS: readonly OxlintNativePlugin[] = [
  "eslint",
  "typescript",
  "react",
  "unicorn",
  "import",
  "jest",
  "vitest",
  "jsx-a11y",
  "jsdoc",
  "promise",
  "node",
] as const;

/**
 * ESLintプラグイン名からoxlintネイティブプラグイン名への変換
 */
export const PLUGIN_NAME_MAP: Record<string, OxlintNativePlugin | null> = {
  // ESLintコアルール（プラグイン指定不要）
  eslint: "eslint",

  // TypeScript
  "@typescript-eslint": "typescript",

  // React関連
  react: "react",
  "react-hooks": null, // react プラグインに含まれる

  // その他のプラグイン
  unicorn: "unicorn",
  import: "import",
  "import-x": "import", // import-xはimportとして扱う
  jest: "jest",
  vitest: "vitest",
  "jsx-a11y": "jsx-a11y",
  jsdoc: "jsdoc",
  promise: "promise",
  n: "node",

  // JSプラグイン（ネイティブサポートなし）
  "@eslint-community/eslint-comments": null,
  "no-only-tests": null,
  "jest-dom": null,
  "testing-library": null,
  "react-you-might-not-need-an-effect": null,
  jsonc: null,
  markdown: null,
};

/**
 * JSプラグインとして使用する必要があるESLintプラグイン
 * oxlintでネイティブサポートされていないプラグイン
 */
export const JS_PLUGINS = [
  "@eslint-community/eslint-plugin-eslint-comments",
  "eslint-plugin-no-only-tests",
  "eslint-plugin-jest-dom",
  "eslint-plugin-testing-library",
  "eslint-plugin-react-you-might-not-need-an-effect",
  "eslint-plugin-jsonc",
  "@eslint/markdown",
] as const;

/**
 * ESLintプラグイン名をoxlintプラグイン名に変換
 * @param eslintPluginName ESLintプラグイン名
 * @returns oxlintプラグイン名（ネイティブサポートなしの場合はnull）
 */
export function mapPluginName(
  eslintPluginName: string,
): OxlintNativePlugin | null {
  return PLUGIN_NAME_MAP[eslintPluginName] ?? null;
}

/**
 * プラグイン名がネイティブサポートされているか判定
 */
export function isNativePlugin(
  pluginName: string,
): pluginName is OxlintNativePlugin {
  return (NATIVE_PLUGINS as readonly string[]).includes(pluginName);
}
