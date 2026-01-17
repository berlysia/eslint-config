/**
 * oxlint用設定のエクスポート
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { generateOxlintConfig } from "./generator";
import type { OxlintConfig, OxlintOptions } from "./types";

export type { OxlintConfig, OxlintOptions } from "./types";

/**
 * oxlint用の設定を生成
 * @param options オプション
 * @returns oxlint設定オブジェクト
 * @example
 * ```typescript
 * import { berlysiaOxlint } from "@berlysia/eslint-config/oxlint";
 *
 * const config = berlysiaOxlint({
 *   typescript: true,
 *   react: true,
 *   testLibrary: "vitest"
 * });
 *
 * console.log(JSON.stringify(config, null, 2));
 * ```
 */
export function berlysiaOxlint(options: OxlintOptions = {}): OxlintConfig {
  return generateOxlintConfig(options);
}

/**
 * oxlint設定を.oxlintrc.jsonファイルに書き出す
 * @param options オプション
 * @param outputPath 出力先パス（デフォルト: .oxlintrc.json）
 * @example
 * ```typescript
 * import { writeOxlintConfig } from "@berlysia/eslint-config/oxlint";
 *
 * await writeOxlintConfig({
 *   typescript: true,
 *   react: true,
 *   testLibrary: "vitest"
 * });
 * ```
 */
export async function writeOxlintConfig(
  options: OxlintOptions = {},
  outputPath = ".oxlintrc.json",
): Promise<void> {
  const config = berlysiaOxlint(options);
  const configJson = JSON.stringify(config, null, 2);

  const fullPath = path.join(process.cwd(), outputPath);
  await writeFile(fullPath, `${configJson}\n`, "utf8");
}

export default berlysiaOxlint;
