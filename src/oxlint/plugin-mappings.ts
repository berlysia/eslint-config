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
 * このパッケージのflat configで使っているプラグイン名（ルールIDの接頭辞）から
 * oxlintネイティブプラグイン名への変換。
 * null はoxlintにネイティブ実装がないプラグイン。
 * `test` はテストライブラリによって変わるため mapPluginName で扱う。
 */
const PLUGIN_NAME_MAP: Record<string, OxlintNativePlugin | null> = {
  "@typescript-eslint": "typescript",
  react: "react",
  // oxlintではrules-of-hooks等がreactプラグインに含まれる
  "react-hooks": "react",
  "jsx-a11y": "jsx-a11y",
  unicorn: "unicorn",
  import: "import",
  jsdoc: "jsdoc",
  promise: "promise",
  node: "node",

  "eslint-comments": null,
  "testing-library": null,
  "react-you-might-not-need-an-effect": null,
  jsonc: null,
  markdown: null,
};

/**
 * ESLintプラグイン名をoxlintプラグイン名に変換
 * @param eslintPluginName flat configでのプラグイン名
 * @param testLibrary `test` プラグインの変換先
 * @returns oxlintプラグイン名（ネイティブサポートなしの場合はnull）
 */
export function mapPluginName(
  eslintPluginName: string,
  testLibrary: "jest" | "vitest" | false,
): OxlintNativePlugin | null {
  if (eslintPluginName === "test") {
    return testLibrary || null;
  }
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
