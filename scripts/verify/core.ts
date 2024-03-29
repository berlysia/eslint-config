import { Linter } from "eslint";
import type { FlatConfigItem } from "../../src/types";
import configsCore from "../../src/configs/eslint-core";

export default function verifyCore() {
  const configs = configsCore({});
  const rules = configs.reduce<NonNullable<FlatConfigItem["rules"]>>(
    (acc, config) => ({ ...acc, ...config.rules }),
    {},
  );

  const linter = new Linter();
  const definedRules = linter.getRules();

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
