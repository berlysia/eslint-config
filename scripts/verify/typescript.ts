import plugin from "@typescript-eslint/eslint-plugin";
import type { RuleModule } from "@typescript-eslint/utils/ts-eslint";
import {
  typeAwareRules as withType,
  nonTypeAwareRules as withoutType,
} from "../../src/configs/typescript.ts";

// branded type
type PrefixedRuleName = string & { __brand: "PrefixedRuleName" };
function assertPrefixedRuleName(
  name: string,
): asserts name is PrefixedRuleName {
  const splitted = name.split("/");
  if (!name.startsWith("@") && splitted.length < 2) {
    throw new Error(`Invalid rule name: ${name}`);
  }
}
function isPrefixedRuleName(name: string): name is PrefixedRuleName {
  assertPrefixedRuleName(name);
  return true;
}
type UnprefixedRuleName = string & { __brand: "UnprefixedRuleName" };
function assertUnprefixedRuleName(
  name: string,
): asserts name is UnprefixedRuleName {
  if (name.includes("/") && name.startsWith("@")) {
    throw new Error(`Invalid rule name: ${name}`);
  }
}
function isUnprefixedRuleName(name: string): name is UnprefixedRuleName {
  assertUnprefixedRuleName(name);
  return true;
}

const definedRules = plugin.rules;

function isTypeScriptRule(ruleName: string) {
  return ruleName.startsWith(`@typescript-eslint/`);
}

function addPrefix(ruleName: UnprefixedRuleName): PrefixedRuleName {
  const result = `@typescript-eslint/${ruleName}`;
  assertPrefixedRuleName(result);
  return result;
}

function dropPrefix(ruleName: PrefixedRuleName): UnprefixedRuleName {
  if (!isTypeScriptRule(ruleName)) {
    throw new Error(`Not a typescript rule: ${ruleName}`);
  }
  const [, result] = ruleName.split("/");
  assertUnprefixedRuleName(result!);
  return result;
}

function isDefinedRule(ruleName: UnprefixedRuleName) {
  return Boolean(definedRules[ruleName]);
}

function isDeprecatedRule(ruleName: UnprefixedRuleName) {
  return Boolean(definedRules[ruleName]?.meta.deprecated);
}

function isTypeAwareRule(pluginRuleName: UnprefixedRuleName) {
  return Boolean(definedRules[pluginRuleName]?.meta.docs.requiresTypeChecking);
}

function pairwiseRuleNameAndDocsUrl(ruleName: PrefixedRuleName) {
  return {
    name: ruleName,
    docs: definedRules[dropPrefix(ruleName)]?.meta.docs.url,
  };
}

export default function verify() {
  const withTypeConfiguredRuleNames = Object.keys(withType)
    .filter(isTypeScriptRule)
    .filter(isPrefixedRuleName);
  const withoutTypeConfiguredRuleNames = Object.keys(withoutType)
    .filter(isTypeScriptRule)
    .filter(isPrefixedRuleName);
  const definedRuleNames = Object.keys(definedRules)
    .filter(isUnprefixedRuleName)
    .map((x) => addPrefix(x));

  const missingInWithType = definedRuleNames.filter((ruleName) => {
    const dropped = dropPrefix(ruleName);
    return (
      isTypeAwareRule(dropped) &&
      !isDeprecatedRule(dropped) &&
      !withType.rules[ruleName]
    );
  });
  const missingInWithoutType = definedRuleNames.filter((ruleName) => {
    const dropped = dropPrefix(ruleName);

    return (
      !isTypeAwareRule(dropped) &&
      !isDeprecatedRule(dropped) &&
      !withoutType.rules[ruleName]
    );
  });

  const withTypeInWithoutType = withTypeConfiguredRuleNames.filter(
    (ruleName) => !withoutType.rules[ruleName],
  );
  const withoutTypeInWithType = withoutTypeConfiguredRuleNames.filter(
    (ruleName) => !withType.rules[ruleName],
  );

  const unknownInWithType = withTypeConfiguredRuleNames.filter(
    (ruleName) => !isDefinedRule(dropPrefix(ruleName)),
  );
  const unknownInWithoutType = withoutTypeConfiguredRuleNames.filter(
    (ruleName) => !isDefinedRule(dropPrefix(ruleName)),
  );

  const deprecatedInWithType = withTypeConfiguredRuleNames.filter(
    (ruleName) => {
      const dropped = dropPrefix(ruleName);
      return isDefinedRule(dropped) && isDeprecatedRule(dropped);
    },
  );
  const deprecatedInWithoutType = withoutTypeConfiguredRuleNames.filter(
    (ruleName) => {
      const dropped = dropPrefix(ruleName);
      return isDefinedRule(dropped) && isDeprecatedRule(dropped);
    },
  );

  return {
    name: "typescript",
    withType: {
      missing: missingInWithType.map(pairwiseRuleNameAndDocsUrl),
      misdefined: withTypeInWithoutType.map(pairwiseRuleNameAndDocsUrl),
      unknown: unknownInWithType,
      deprecated: deprecatedInWithType.map(pairwiseRuleNameAndDocsUrl),
    },
    withoutType: {
      missing: missingInWithoutType.map(pairwiseRuleNameAndDocsUrl),
      misdefined: withoutTypeInWithType.map(pairwiseRuleNameAndDocsUrl),
      unknown: unknownInWithoutType,
      deprecated: deprecatedInWithoutType.map(pairwiseRuleNameAndDocsUrl),
    },
  };
}
