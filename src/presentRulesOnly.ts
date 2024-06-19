import eslintUnsafe from "eslint/use-at-your-own-risk";
import type { ESLint } from "eslint";
import type { FlatConfigItem } from "./types";

function coreRuleIsPresent(ruleName: string): boolean {
  return eslintUnsafe.builtinRules.has(ruleName);
}

function parseRuleId(ruleId: string) {
  if (ruleId.includes("/")) {
    if (ruleId.startsWith("@")) {
      const pluginName = ruleId.slice(0, ruleId.lastIndexOf("/"));
      return {
        pluginName,
        ruleName: ruleId.slice(pluginName.length + 1),
      };
    }

    const pluginName = ruleId.slice(0, ruleId.indexOf("/"));
    return {
      pluginName,
      ruleName: ruleId.slice(pluginName.length + 1),
    };
  }

  return {
    pluginName: "",
    ruleName: ruleId,
  };
}

const absenceSet = new Set<string>();
function processRules(
  rules: NonNullable<FlatConfigItem["rules"]>,
  plugins: NonNullable<FlatConfigItem["plugins"]>,
): FlatConfigItem["rules"] {
  const castedPlugins = plugins as Record<string, ESLint.Plugin>;
  return Object.fromEntries(
    Object.entries(rules as Record<string, unknown>).flatMap((kv) => {
      const [ruleNameInConfig] = kv;
      const { pluginName, ruleName } = parseRuleId(ruleNameInConfig);

      // プラグインを参照していないルールは、コアルールのみを参照しているので、コアルールが存在するかを確認する
      if (pluginName === "" && ruleName !== "") {
        if (coreRuleIsPresent(ruleNameInConfig)) {
          return [kv];
        }
        absenceSet.add(ruleNameInConfig);
        return [];
      }

      // プラグインを参照しているルールは、pluginsの定義に対応するプラグインにルールが存在するかを確認する
      const plugin = castedPlugins[pluginName];
      if (!plugin) {
        throw new Error(`pluginName: "${pluginName}" is not provided`);
      }

      if (plugin.rules?.[ruleName]) {
        return [kv];
      }
      absenceSet.add(ruleNameInConfig);
      return [];
    }),
  ) as FlatConfigItem["rules"];
}

export default function presentRulesOnly(
  configs: FlatConfigItem[],
): FlatConfigItem[] {
  const plugins = configs.reduce<Record<string, unknown>>(
    (acc, { plugins }) => {
      if (!plugins) return acc;
      return { ...acc, ...plugins };
    },
    {},
  ) as Record<string, ESLint.Plugin>;

  return configs.map((config) => {
    const { rules, ...rest } = config;
    if (!rules) return config;
    return {
      ...rest,
      rules: processRules(rules, plugins),
    };
  });
}

export function showAbsence() {
  if (absenceSet.size > 0) {
    console.warn(`Removed rules are found: \n${[...absenceSet].join("\n")}\n`);
  }
  return absenceSet;
}
