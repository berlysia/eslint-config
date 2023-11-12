import plugin from "@typescript-eslint/eslint-plugin";
import type { RuleModule } from "@typescript-eslint/utils/ts-eslint";
import {
  typeAwareRules as withType,
  nonTypeAwareRules as withoutType,
} from "../../src/configs/typescript.ts";

// branded type
type PrefixedRuleName = string & { __brand: "PrefixedRuleName" };
type UnprefixedRuleName = string & { __brand: "UnprefixedRuleName" };

const definedRules = plugin.rules as unknown as Record<
  UnprefixedRuleName,
  RuleModule<string, unknown[]>
>;

function isTypeScriptRule(ruleName: string) {
  return ruleName.startsWith(`@typescript-eslint/`);
}

function addPrefix(ruleName: UnprefixedRuleName): PrefixedRuleName {
  return `@typescript-eslint/${ruleName}` as PrefixedRuleName;
}

function dropPrefix(ruleName: PrefixedRuleName): UnprefixedRuleName {
  if (!isTypeScriptRule(ruleName)) {
    throw new Error(`Not a typescript rule: ${ruleName}`);
  }
  return ruleName.split("/")[1] as UnprefixedRuleName;
}

function isDefinedRule(ruleName: UnprefixedRuleName) {
  return Boolean(definedRules[ruleName]);
}

function isDeprecatedRule(ruleName: UnprefixedRuleName) {
  return definedRules[ruleName].meta.deprecated === true;
}

function isTypeAwareRule(pluginRuleName: UnprefixedRuleName) {
  return Boolean(definedRules[pluginRuleName].meta.docs?.requiresTypeChecking);
}

export default function verify() {
  const withTypeConfiguredRuleNames = Object.keys(
    withType as Record<PrefixedRuleName, unknown>
  ).filter(isTypeScriptRule) as PrefixedRuleName[];
  const withoutTypeConfiguredRuleNames = Object.keys(
    withoutType as Record<PrefixedRuleName, unknown>
  ).filter(isTypeScriptRule) as PrefixedRuleName[];
  const definedRuleNames = Object.keys(definedRules).map((x) =>
    addPrefix(x as UnprefixedRuleName)
  );

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
    (ruleName) => !withoutType.rules[ruleName]
  );
  const withoutTypeInWithType = withoutTypeConfiguredRuleNames.filter(
    (ruleName) => !withType.rules[ruleName]
  );

  const unknownInWithType = withTypeConfiguredRuleNames.filter(
    (ruleName) => !isDefinedRule(dropPrefix(ruleName))
  );
  const unknownInWithoutType = withoutTypeConfiguredRuleNames.filter(
    (ruleName) => !isDefinedRule(dropPrefix(ruleName))
  );

  const deprecatedInWithType = withTypeConfiguredRuleNames.filter(
    (ruleName) => {
      const dropped = dropPrefix(ruleName);
      return isDefinedRule(dropped) && isDeprecatedRule(dropped);
    }
  );
  const deprecatedInWithoutType = withoutTypeConfiguredRuleNames.filter(
    (ruleName) => {
      const dropped = dropPrefix(ruleName);
      return isDefinedRule(dropped) && isDeprecatedRule(dropped);
    }
  );

  return {
    withType: {
      missing: missingInWithType,
      misdefined: withTypeInWithoutType,
      unknown: unknownInWithType,
      deprecated: deprecatedInWithType,
    },
    withoutType: {
      missing: missingInWithoutType,
      misdefined: withoutTypeInWithType,
      unknown: unknownInWithoutType,
      deprecated: deprecatedInWithoutType,
    },
  };
}
