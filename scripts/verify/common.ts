import type { ESLint } from "eslint";
import type { FlatConfigItem } from "../../src/types";
import configsComments from "../../src/configs/eslint-comments";
import configsImport from "../../src/configs/import";
import configsJest from "../../src/configs/jest";
import configsReact from "../../src/configs/react";
import configsSonarjs from "../../src/configs/sonarjs";
import configsUnicorn from "../../src/configs/unicorn";

function verifier(configs: FlatConfigItem[], targetPluginNames: string[]) {
  const rules = configs.reduce<NonNullable<FlatConfigItem["rules"]>>(
    (acc, config) => ({
      ...acc,
      ...config.rules,
    }),
    {}
  );
  const plugins = configs.reduce<NonNullable<FlatConfigItem["plugins"]>>(
    (acc, config) => ({
      ...acc,
      ...config.plugins,
    }),
    {}
  ) as Record<string, ESLint.Plugin>;

  const missing = [];
  const unknown = [];
  const deprecated = [];

  for (const pluginName of targetPluginNames) {
    const plugin = plugins[pluginName];
    for (const ruleName of Object.keys(plugin.rules!)) {
      const ruleNameForConfiguration = `${pluginName}/${ruleName}`;
      const rule = plugin.rules![ruleName];
      const ruleIsConfigured = Boolean(rules[ruleNameForConfiguration]);
      const ruleIsDeprecated =
        typeof rule === "object" && rule.meta?.deprecated === true;

      if (!ruleIsConfigured && !ruleIsDeprecated) {
        missing.push(ruleNameForConfiguration);
      }
      if (ruleIsConfigured && ruleIsDeprecated) {
        deprecated.push(ruleNameForConfiguration);
      }
    }
  }

  for (const ruleName of Object.keys(rules)) {
    if (
      !targetPluginNames.some((pluginName) =>
        ruleName.startsWith(`${pluginName}/`)
      )
    )
      continue;

    const [pluginName, ruleNameWithoutPrefix] = ruleName.split("/");
    const plugin = plugins[pluginName];
    if (!plugin.rules![ruleNameWithoutPrefix]) {
      unknown.push(ruleName);
    }
  }

  return {
    deprecated,
    missing,
    unknown,
  };
}

export default function verify() {
  const verifyTarget: Parameters<typeof verifier>[] = [
    [configsComments(), ["eslint-comments"]],
    [configsImport(), ["import"]],
    [configsJest({ useTypeScript: true }), ["jest"]],
    [configsReact(), ["react", "react-hooks"]],
    [configsSonarjs(), ["sonarjs"]],
    [configsUnicorn(), ["unicorn"]],
  ];

  return verifyTarget.map((args) => verifier(...args));
}
