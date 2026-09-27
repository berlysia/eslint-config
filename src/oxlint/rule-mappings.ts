/**
 * ESLintルールIDからoxlintルールIDへの変換
 */

import { mapPluginName } from "./plugin-mappings";
import { SUPPORTED_RULES } from "./supported-rules";
import type { RuleEntry } from "./types";

type TestLibrary = "jest" | "vitest" | false;

/**
 * ESLintとoxlintでオプションの形が違うルールの変換
 */
const OPTION_TRANSLATORS = new Map<string, (option: unknown) => unknown>([
  [
    // oxlintは同じ意味のフラグを反転した名前で持つ
    "unicorn/prefer-export-from",
    (option) => {
      if (typeof option !== "object" || option === null) return option;
      const { ignoreUsedVariables, ...rest } = option as {
        ignoreUsedVariables?: boolean;
      };
      return ignoreUsedVariables === undefined
        ? rest
        : { ...rest, checkUsedVariables: !ignoreUsedVariables };
    },
  ],
]);

/**
 * ESLintルールIDをoxlintルールIDに変換
 * 例: "@typescript-eslint/no-unused-vars" -> "eslint/no-unused-vars"
 * @returns oxlintルールID（oxlintが実装していないルールはnull）
 */
export function mapRuleId(
  eslintRuleId: string,
  testLibrary: TestLibrary,
): string | null {
  if (!eslintRuleId.includes("/")) {
    const id = `eslint/${eslintRuleId}`;
    return SUPPORTED_RULES.has(id) ? id : null;
  }

  const [pluginName, ...ruleNameParts] = eslintRuleId.split("/");
  const ruleName = ruleNameParts.join("/");
  const oxlintPluginName = pluginName
    ? mapPluginName(pluginName, testLibrary)
    : null;
  if (!oxlintPluginName) {
    return null;
  }

  const id = `${oxlintPluginName}/${ruleName}`;
  if (SUPPORTED_RULES.has(id)) {
    return id;
  }

  // typescript-eslintの拡張ルール（no-unused-vars等）は、oxlintではTypeScriptを
  // 理解するeslintプラグイン側の同名ルールが担う
  if (oxlintPluginName === "typescript") {
    const coreId = `eslint/${ruleName}`;
    if (SUPPORTED_RULES.has(coreId)) {
      return coreId;
    }
  }

  return null;
}

function mapRuleEntry(oxlintRuleId: string, entry: RuleEntry): RuleEntry {
  const translate = OPTION_TRANSLATORS.get(oxlintRuleId);
  if (!translate || !Array.isArray(entry)) {
    return entry;
  }
  const [severity, ...ruleOptions] = entry;
  return [severity, ...ruleOptions.map((option) => translate(option))];
}

/**
 * ESLintルール設定オブジェクトをoxlintルール設定オブジェクトに変換
 *
 * 拡張ルールとコアルールが同じoxlintルールに集約される場合は、後に現れた設定
 * （TypeScript向け設定）が優先される。
 * @returns oxlintルール設定（oxlintが実装していないルールは除外）
 */
export function mapRules(
  eslintRules: Record<string, RuleEntry>,
  testLibrary: TestLibrary,
): Record<string, RuleEntry> {
  const oxlintRules: Record<string, RuleEntry> = {};

  for (const [eslintRuleId, eslintRuleEntry] of Object.entries(eslintRules)) {
    const oxlintRuleId = mapRuleId(eslintRuleId, testLibrary);
    if (oxlintRuleId) {
      oxlintRules[oxlintRuleId] = mapRuleEntry(oxlintRuleId, eslintRuleEntry);
    }
  }

  return oxlintRules;
}
