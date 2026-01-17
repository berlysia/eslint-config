/**
 * ESLintルールIDからoxlintルールIDへの変換
 */

import { mapPluginName } from "./plugin-mappings";
import type { RuleEntry } from "./types";

/**
 * ESLintルールIDをoxlintルールIDに変換
 * 例: "@typescript-eslint/no-unused-vars" -> "typescript/no-unused-vars"
 * @param eslintRuleId ESLintルールID
 * @returns oxlintルールID
 */
export function mapRuleId(eslintRuleId: string): string | null {
  // プラグインプレフィックスがない場合（ESLintコアルール）
  if (!eslintRuleId.includes("/")) {
    return `eslint/${eslintRuleId}`;
  }

  // プラグインプレフィックスを分離
  const [pluginName, ...ruleNameParts] = eslintRuleId.split("/");
  const ruleName = ruleNameParts.join("/");

  // プラグイン名が存在しない場合はnull
  if (!pluginName) {
    return null;
  }

  // プラグイン名を変換
  const oxlintPluginName = mapPluginName(pluginName);

  // ネイティブサポートされていない場合はnull
  if (!oxlintPluginName) {
    return null;
  }

  return `${oxlintPluginName}/${ruleName}`;
}

/**
 * ESLintルールエントリをoxlintルールエントリに変換
 * @param eslintRuleId ESLintルールID
 * @param eslintRuleEntry ESLintルールエントリ
 * @returns oxlintルールエントリ（サポートされていない場合はnull）
 */
export function mapRuleEntry(
  eslintRuleId: string,
  eslintRuleEntry: RuleEntry,
): [string, RuleEntry] | null {
  const oxlintRuleId = mapRuleId(eslintRuleId);

  // サポートされていないルール
  if (!oxlintRuleId) {
    return null;
  }

  // ルールエントリをそのまま返す
  // TODO: 必要に応じてルールオプションの変換を追加
  return [oxlintRuleId, eslintRuleEntry];
}

/**
 * ESLintルール設定オブジェクトをoxlintルール設定オブジェクトに変換
 * @param eslintRules ESLintルール設定
 * @returns oxlintルール設定（サポートされていないルールは除外）
 */
export function mapRules(
  eslintRules: Record<string, RuleEntry>,
): Record<string, RuleEntry> {
  const oxlintRules: Record<string, RuleEntry> = {};

  for (const [eslintRuleId, eslintRuleEntry] of Object.entries(eslintRules)) {
    const mapped = mapRuleEntry(eslintRuleId, eslintRuleEntry);
    if (mapped) {
      const [oxlintRuleId, oxlintRuleEntry] = mapped;
      oxlintRules[oxlintRuleId] = oxlintRuleEntry;
    }
  }

  return oxlintRules;
}
