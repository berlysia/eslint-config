/**
 * oxlint設定の生成ロジック
 */

import configsComments from "../configs/eslint-comments";
import configsCore from "../configs/eslint-core";
import configsImport from "../configs/import";
import configsJsdoc from "../configs/jsdoc";
import configsNode from "../configs/node";
import configsPromise from "../configs/promise";
import configsReact from "../configs/react";
import configsTest from "../configs/test";
import configsTypeScript from "../configs/typescript";
import configsUnicorn from "../configs/unicorn";
import { detectDependencies } from "./detect";
import { isNativePlugin } from "./plugin-mappings";
import { mapRules } from "./rule-mappings";
import type {
  OxlintConfig,
  OxlintNativePlugin,
  OxlintOptions,
  RulesRecord,
} from "./types";

/**
 * 各設定からルールを収集
 */
function collectRulesFromConfigs(
  configs: Array<{ rules?: Record<string, unknown> }>,
): RulesRecord {
  const allRules: RulesRecord = {};

  for (const config of configs) {
    if (config.rules) {
      Object.assign(allRules, config.rules);
    }
  }

  return allRules;
}

/**
 * oxlint設定を生成
 */
export function generateOxlintConfig(options: OxlintOptions): OxlintConfig {
  const detected = detectDependencies();
  const {
    typescript: useTypeScript = detected.typescript,
    react: useReact = detected.react,
    testLibrary = detected.testLibrary,
  } = options;

  const optionTypeScript =
    typeof useTypeScript === "boolean" ? {} : useTypeScript;

  // 各設定からルールを収集
  const allConfigs = [
    ...configsCore({ overrides: options.overrides?.core }),
    ...configsComments({ overrides: options.overrides?.comments }),
    ...configsImport({ overrides: options.overrides?.import }),
    ...configsUnicorn({ overrides: options.overrides?.unicorn }),
    ...configsNode({ overrides: options.overrides?.node }),
    ...configsJsdoc({ overrides: options.overrides?.jsdoc }),
    ...configsPromise({ overrides: options.overrides?.promise }),
  ];

  if (useReact) {
    allConfigs.push(...configsReact({ overrides: options.overrides?.react }));
  }

  if (useTypeScript) {
    allConfigs.push(
      ...configsTypeScript({
        ...optionTypeScript,
        overrides: options.overrides?.typescript,
      }),
    );
  }

  if (testLibrary) {
    allConfigs.push(
      ...configsTest({
        ...optionTypeScript,
        testLibrary,
        isInEditor: false,
        overrides: options.overrides?.test,
      }),
    );
  }

  // ESLintルールを収集
  const eslintRules = collectRulesFromConfigs(allConfigs);

  // oxlint形式に変換
  const oxlintRules = mapRules(eslintRules);

  // 使用するプラグインを特定
  const plugins = new Set<OxlintNativePlugin>(["eslint"]);

  // ルールIDからプラグインを抽出
  for (const ruleId of Object.keys(oxlintRules)) {
    const [pluginName] = ruleId.split("/");
    if (pluginName && isNativePlugin(pluginName)) {
      plugins.add(pluginName);
    }
  }

  // 設定を生成
  const config: OxlintConfig = {
    $schema: "./node_modules/oxlint/configuration_schema.json",
    plugins: [...plugins].sort(),
    rules: oxlintRules,
  };

  return config;
}
