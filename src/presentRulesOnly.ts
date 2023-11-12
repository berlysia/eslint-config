import { Linter } from "eslint";
import type { ESLint } from "eslint";
import type { FlatConfigItem } from "./types";

const linter = new Linter();
const builtinRules = linter.getRules();

function coreRuleIsPresent(ruleName: string): boolean {
  return builtinRules.has(ruleName);
}

const absenceSet = new Set<string>();
function processRules(
  rules: NonNullable<FlatConfigItem["rules"]>,
  plugins: NonNullable<FlatConfigItem["plugins"]>
): FlatConfigItem["rules"] {
  const castedPlugins = plugins as Record<string, ESLint.Plugin>;
  return Object.fromEntries(
    Object.entries(rules as Record<string, unknown>).flatMap((kv) => {
      const [ruleNameInConfig] = kv;
      const splitted = ruleNameInConfig.split("/");

      // プラグインを参照していないルールは、コアルールのみを参照しているので、コアルールが存在するかを確認する
      if (splitted.length === 1) {
        if (coreRuleIsPresent(ruleNameInConfig)) {
          return [kv];
        }
        absenceSet.add(ruleNameInConfig);
        return [];
      }

      // プラグインを参照しているルールは、pluginsの定義に対応するプラグインにルールが存在するかを確認する
      if (splitted.length === 2) {
        const [pluginName, ruleName] = splitted as [string, string];
        const plugin = castedPlugins[pluginName];
        if (!plugin) {
          throw new Error(`pluginName: "${pluginName}" is not provided`);
        }

        if (plugin.rules?.[ruleName]) {
          return [kv];
        }
        absenceSet.add(ruleNameInConfig);
        return [];
      }

      throw new Error(`ruleName: "${ruleNameInConfig}" is unknown pattern`);
    })
  ) as FlatConfigItem["rules"];
}

export default function presentRulesOnly(
  configs: FlatConfigItem[]
): FlatConfigItem[] {
  const plugins = configs.reduce<Record<string, unknown>>(
    (acc, { plugins }) => {
      if (!plugins) return acc;
      return { ...acc, ...plugins };
    },
    {}
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
