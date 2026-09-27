/**
 * oxlint設定の生成ロジック
 */

import { rulesComments } from "../rules/eslint-comments";
import { rulesCore } from "../rules/eslint-core";
import { rulesImport } from "../rules/import";
import { rulesJsdoc } from "../rules/jsdoc";
import { rulesNode } from "../rules/node";
import { rulesPromise } from "../rules/promise";
import { rulesReact } from "../rules/react";
import { rulesTest, rulesTestTypeScript } from "../rules/test";
import { nonTypeAwareRules, typeAwareRules } from "../rules/typescript";
import { rulesUnicorn } from "../rules/unicorn";
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
 * 複数のルールレコードをマージ
 */
function mergeRules(
  ruleRecords: Array<Record<string, unknown> | undefined>,
): RulesRecord {
  const allRules: RulesRecord = {};

  for (const rules of ruleRecords) {
    if (rules) {
      Object.assign(allRules, rules);
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

  // 各ルールモジュールからルールを収集
  const ruleRecords: Array<Record<string, unknown> | undefined> = [
    rulesCore({ overrides: options.overrides?.core }),
    rulesComments({ overrides: options.overrides?.comments }),
    rulesImport({ overrides: options.overrides?.import }),
    rulesUnicorn({ overrides: options.overrides?.unicorn }),
    rulesNode({ overrides: options.overrides?.node }),
    rulesJsdoc({ overrides: options.overrides?.jsdoc }),
    rulesPromise({ overrides: options.overrides?.promise }),
  ];

  if (useReact) {
    ruleRecords.push(rulesReact({ overrides: options.overrides?.react }));
  }

  if (useTypeScript) {
    const tsConfigPath = optionTypeScript.tsConfigPath
      ? [optionTypeScript.tsConfigPath].flat()
      : undefined;
    ruleRecords.push({
      ...nonTypeAwareRules.rules,
      ...(tsConfigPath ? typeAwareRules.rules : {}),
      ...options.overrides?.typescript,
    });
  }

  if (testLibrary) {
    ruleRecords.push(
      rulesTest({
        ...optionTypeScript,
        testLibrary,
        isInEditor: false,
        overrides: options.overrides?.test,
      }),
    );

    // OxlintOptions.typescript has no `parserOptions` field (unlike the
    // ESLint config factory), so only `tsConfigPath` can trigger this here.
    const tsConfigPath = optionTypeScript.tsConfigPath
      ? [optionTypeScript.tsConfigPath].flat()
      : undefined;
    if (tsConfigPath && testLibrary === "jest") {
      ruleRecords.push(rulesTestTypeScript());
    }
  }

  // ESLintルールを収集
  const eslintRules = mergeRules(ruleRecords);

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
