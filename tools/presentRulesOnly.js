function coreRuleIsPresent(ruleName) {
  const unsupportedAPI = require("eslint/use-at-your-own-risk");
  return unsupportedAPI.builtinRules.has(ruleName);
}

const absenceSet = new Set();

function scopedPluginRuleIsPresent(scopeName, ruleName) {
  // eslint-disable-next-line import/no-dynamic-require -- forgive me
  const plugin = require(`${scopeName}/eslint-plugin`);
  const pluginRules = plugin.rules;
  if (!pluginRules) {
    absenceSet.add(scopeName);
    return true;
  }
  return Boolean(pluginRules[ruleName]);
}

function pluginRuleIsPresent(pluginSlug, ruleName) {
  const pluginName = pluginSlug.startsWith("eslint-plugin-")
    ? pluginSlug
    : `eslint-plugin-${pluginSlug}`;
  // eslint-disable-next-line import/no-dynamic-require -- forgive me
  const plugin = require(pluginName);
  const pluginRules = plugin.rules;
  if (!pluginRules) {
    absenceSet.add(pluginName);
    return true;
  }
  return Boolean(pluginRules[ruleName]);
}

module.exports = function presentRulesOnly(rules) {
  const filtered = Object.fromEntries(
    Object.entries(rules)
      .map((kv) => {
        const [ruleName] = kv;
        const splitted = ruleName.split("/");
        if (splitted.length === 1) {
          return coreRuleIsPresent(ruleName) ? kv : undefined;
        }
        if (splitted.length === 2) {
          const [scopeOrName, ruleName] = splitted;
          const isScoped = scopeOrName.startsWith("@");
          if (isScoped) {
            return scopedPluginRuleIsPresent(scopeOrName, ruleName)
              ? kv
              : undefined;
          }
          return pluginRuleIsPresent(scopeOrName, ruleName) ? kv : undefined;
        }
        throw new Error(`ruleName: "${ruleName}" is unknown pattern`);
      })
      .filter(Boolean)
  );
  return filtered;
};

module.exports.showAbsence = function showAbsence() {
  if (absenceSet.size > 0) {
    console.warn(`Removed rules are found: ${absenceSet}`);
  }
  return absenceSet;
};
