const plugin = require("@typescript-eslint/eslint-plugin");

const RULE_PREFIX = "@typescript-eslint";

const notDeprecated = ([, dfn]) => !dfn.meta.deprecated;
function extract(isWithType) {
  const filterFunction = isWithType
    ? ([, dfn]) => dfn.meta.docs.requiresTypeChecking === true
    : ([, dfn]) => dfn.meta.docs.requiresTypeChecking !== true;

  const pairwised = Object.entries(plugin.rules);
  const filtered = pairwised
    .filter((element) => notDeprecated(element))
    .filter((element) => filterFunction(element));

  const ruleNames = filtered.map(([name]) => `${RULE_PREFIX}/${name}`);
  return ruleNames;
}

function isTypeScriptRule(ruleName) {
  return ruleName.startsWith(RULE_PREFIX);
}

function hasRule(ruleName) {
  const name = ruleName.split("/")[1];
  return Object.hasOwn(plugin.rules, name);
}

module.exports = {
  extract,
  hasRule,
  isTypeScriptRule,
};
