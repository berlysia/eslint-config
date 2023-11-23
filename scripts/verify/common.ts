import type { ESLint } from "eslint";
import type { FlatConfigItem } from "../../src/types";
import configsComments from "../../src/configs/eslint-comments";
import configsImport from "../../src/configs/import";
import configsTest from "../../src/configs/test";
import configsReact from "../../src/configs/react";
import configsSonarjs from "../../src/configs/sonarjs";
import configsUnicorn from "../../src/configs/unicorn";
import configsNode from "../../src/configs/node";
import configsJsdoc from "../../src/configs/jsdoc";
import configsJsonc from "../../src/configs/jsonc";
import configsPromise from "../../src/configs/promise";
import configsMarkdown from "../../src/configs/markdown";

function verifier(configs: FlatConfigItem[], targetPluginNames: string[]) {
  const rules = configs.reduce<NonNullable<FlatConfigItem["rules"]>>(
    (acc, config) => ({
      ...acc,
      ...config.rules,
    }),
    {},
  );
  const plugins = configs.reduce<NonNullable<FlatConfigItem["plugins"]>>(
    (acc, config) => ({
      ...acc,
      ...config.plugins,
    }),
    {},
  ) as Record<string, ESLint.Plugin>;

  const missing = [];
  const unknown = [];
  const deprecated = [];

  for (const pluginName of targetPluginNames) {
    const plugin = plugins[pluginName];
    if (!plugin) {
      console.error(`plugin ${pluginName} is not found`);
      continue;
    }
    if (!plugin.rules) {
      console.error(`plugin ${pluginName} has no rules`);
      continue;
    }
    for (const ruleName of Object.keys(plugin.rules)) {
      const ruleNameForConfiguration = `${pluginName}/${ruleName}`;
      const rule = plugin.rules[ruleName];
      const ruleIsConfigured = Boolean(rules[ruleNameForConfiguration]);
      const ruleIsDeprecated = Boolean(
        typeof rule === "object" && rule.meta?.deprecated,
      );

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
        ruleName.startsWith(`${pluginName}/`),
      )
    )
      continue;

    const [pluginName, ...rest] = ruleName.split("/");
    const ruleNameWithoutPrefix = rest.join("/");
    if (!pluginName || !ruleNameWithoutPrefix) {
      unknown.push(ruleName);
      continue;
    }
    const rule = plugins[pluginName]?.rules![ruleNameWithoutPrefix];
    if (!rule) {
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
    [configsComments({}), ["eslint-comments"]],
    [configsImport({}), ["import"]],
    [configsJsdoc({}), ["jsdoc"]],
    [configsJsonc({}), ["jsonc"]],
    [configsMarkdown({}), ["markdown"]],
    [configsNode({}), ["node"]],
    [configsPromise({}), ["promise"]],
    [configsReact({}), ["react", "react-hooks"]],
    [configsSonarjs({}), ["sonarjs"]],
    [configsTest({ tsConfigPath: "x", testLibrary: "jest" }), ["test"]],
    [configsTest({ tsConfigPath: "x", testLibrary: "vitest" }), ["test"]],
    [configsUnicorn({}), ["unicorn"]],
  ];

  return verifyTarget.map((args) => verifier(...args));
}
