const plugin = require("@typescript-eslint/eslint-plugin");

const RULE_PREFIX = "@typescript-eslint";

function extract(isWithType) {
  const notDeprecated = ([, dfn]) => !dfn.meta.deprecated;
  const filterFn = isWithType
    ? ([, dfn]) => dfn.meta.docs.requiresTypeChecking === true
    : ([, dfn]) => dfn.meta.docs.requiresTypeChecking !== true;

  const pairwised = Object.entries(plugin.rules);
  const filtered = pairwised.filter(notDeprecated).filter(filterFn);

  const ruleNames = filtered.map(([name]) => `${RULE_PREFIX}/${name}`);
  return ruleNames;
}

function isTypeScriptRule(ruleName) {
  return ruleName.startsWith(RULE_PREFIX);
}

function hasRule(ruleName) {
  const name = ruleName.split("/")[1];
  return Object.prototype.hasOwnProperty.call(plugin.rules, name);
}

module.exports = {
  extract,
  hasRule,
  isTypeScriptRule,
};
