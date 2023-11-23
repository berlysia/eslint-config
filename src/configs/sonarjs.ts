import { GLOB_SRC, GLOB_STORIES } from "../globs";
import { pluginSonarJs } from "../plugins";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsSonarjs(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:sonarjs",
      files: [GLOB_SRC],
      plugins: {
        sonarjs: pluginSonarJs,
      },
      rules: {
        "sonarjs/cognitive-complexity": "off",
        "sonarjs/elseif-without-else": "off",
        "sonarjs/max-switch-cases": "error",
        "sonarjs/no-all-duplicated-branches": "warn",
        "sonarjs/no-collapsible-if": "error",
        "sonarjs/no-collection-size-mischeck": "error",
        "sonarjs/no-duplicate-string": "error",
        "sonarjs/no-duplicated-branches": "error",
        "sonarjs/no-element-overwrite": "error",
        "sonarjs/no-empty-collection": "error",
        "sonarjs/no-extra-arguments": "error",
        "sonarjs/no-gratuitous-expressions": "error",
        "sonarjs/no-identical-conditions": "error",
        "sonarjs/no-identical-expressions": "error",
        "sonarjs/no-identical-functions": "off",
        "sonarjs/no-ignored-return": "error",
        "sonarjs/no-inverted-boolean-check": "error",
        "sonarjs/no-nested-switch": "error",
        "sonarjs/no-nested-template-literals": "off",
        "sonarjs/no-one-iteration-loop": "error",
        "sonarjs/no-redundant-boolean": "warn",
        "sonarjs/no-redundant-jump": "error",
        "sonarjs/no-same-line-conditional": "error",
        "sonarjs/no-small-switch": "warn",
        "sonarjs/no-unused-collection": "warn",
        "sonarjs/no-use-of-empty-return-value": "error",
        "sonarjs/no-useless-catch": "error",
        "sonarjs/non-existent-operator": "error",
        "sonarjs/prefer-immediate-return": "error",
        "sonarjs/prefer-object-literal": "error",
        "sonarjs/prefer-single-boolean-return": "error",
        "sonarjs/prefer-while": "error",

        ...options.overrides,
      },
    },
    {
      files: GLOB_STORIES,
      rules: {
        "sonarjs/no-duplicate-string": "off",
      },
    },
  ];
}
