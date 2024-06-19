import eslintUnsafe from "eslint/use-at-your-own-risk";
import type { FlatConfigItem } from "../../src/types";
import configsCore from "../../src/configs/eslint-core";

export default function verifyCore() {
  const configs = configsCore({});
  const rules = configs.reduce<NonNullable<FlatConfigItem["rules"]>>(
    (acc, config) => ({ ...acc, ...config.rules }),
    {},
  );

  // TODO: https://github.com/eslint/eslint/issues/18322#issuecomment-2057589871
  const definedRules = eslintUnsafe.builtinRules;

  const missing = [];
  const unknown = [];
  const deprecated = [];

  for (const definedRuleName of definedRules.keys()) {
    const rule = definedRules.get(definedRuleName);
    const ruleIsConfigured = Boolean(rules[definedRuleName]);
    const ruleIsDeprecated = Boolean(rule?.meta?.deprecated);
    const ruleDocsUrl = rule?.meta?.docs?.url;

    if (!ruleIsConfigured && !ruleIsDeprecated) {
      missing.push({ name: definedRuleName, docs: ruleDocsUrl });
    }
    if (ruleIsConfigured && ruleIsDeprecated) {
      deprecated.push({ name: definedRuleName, docs: ruleDocsUrl });
    }
  }

  for (const ruleName of Object.keys(rules)) {
    // ignore plugin rules
    if (ruleName.includes("/")) continue;

    if (!definedRules.has(ruleName)) {
      unknown.push(ruleName);
    }
  }

  return {
    name: "eslint-core",
    missing,
    unknown,
    deprecated,
  };
}
