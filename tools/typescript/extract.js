const plugin = require("@typescript-eslint/eslint-plugin");

function extract(isWithType) {
  const notDeprecated = ([, dfn]) => !dfn.meta.deprecated;
  const filterFn = isWithType
    ? ([, dfn]) => dfn.meta.docs.requiresTypeChecking === true
    : ([, dfn]) => dfn.meta.docs.requiresTypeChecking !== true;

  const RULE_PREFIX = "@typescript-eslint";

  const pairwised = Object.entries(plugin.rules);
  const filtered = pairwised.filter(notDeprecated).filter(filterFn);

  const ruleNames = filtered.map(([name]) => `${RULE_PREFIX}/${name}`);
  return ruleNames;
}

module.exports = extract;

if (!module.parent) {
  console.log(extract(process.argv.includes("--withType")));
}
