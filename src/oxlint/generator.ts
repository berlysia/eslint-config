/**
 * oxlint設定の生成ロジック
 *
 * ESLintのプラグイン本体は読み込まず、ルール定義（src/rules）だけから生成する。
 * TypeScript 7のプロジェクトではtypescript-eslintが読み込み時点で失敗するため。
 */

import { GLOB_TESTS_BRACE } from "../globs";
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

function collectPlugins(rules: RulesRecord): Set<OxlintNativePlugin> {
  const plugins = new Set<OxlintNativePlugin>();
  for (const ruleId of Object.keys(rules)) {
    const [pluginName] = ruleId.split("/");
    if (pluginName && isNativePlugin(pluginName)) {
      plugins.add(pluginName);
    }
  }
  return plugins;
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
  const useTypeAware =
    useTypeScript !== false &&
    (options.typeAware ??
      (optionTypeScript.tsConfigPath !== undefined || detected.typeAware));

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
    ruleRecords.push({
      ...nonTypeAwareRules.rules,
      ...(useTypeAware ? typeAwareRules.rules : {}),
      ...options.overrides?.typescript,
    });
  }

  const rules = mapRules(mergeRules(ruleRecords), testLibrary);
  const plugins = collectPlugins(rules);
  plugins.add("eslint");

  const config: OxlintConfig = {
    $schema: "./node_modules/oxlint/configuration_schema.json",
    ...(useTypeAware ? { options: { typeAware: true } } : {}),
    plugins: [...plugins].sort(),
    rules,
  };

  // テスト用ルールはESLint設定と同じくテストファイルだけに適用する
  if (testLibrary) {
    const testRules = mapRules(
      mergeRules([
        rulesTest({
          testLibrary,
          isInEditor: false,
          overrides: options.overrides?.test,
        }),
        useTypeAware && testLibrary === "jest" ? rulesTestTypeScript() : {},
      ]),
      testLibrary,
    );
    config.overrides = [
      {
        files: GLOB_TESTS_BRACE,
        plugins: [...collectPlugins(testRules)].sort(),
        rules: testRules,
      },
    ];
  }

  return config;
}
