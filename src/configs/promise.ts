import { GLOB_SRC } from "../globs";
import { pluginPromise } from "../plugins";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsPromise(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:promise",
      files: [GLOB_SRC],
      plugins: {
        promise: pluginPromise,
      },
      rules: {
        "promise/always-return": "error",
        "promise/avoid-new": "error",
        "promise/catch-or-return": "error",
        "promise/no-callback-in-promise": "error",
        "promise/no-multiple-resolved": "error",
        "promise/no-native": "off",
        "promise/no-nesting": "error",
        "promise/no-new-statics": "error",
        "promise/no-promise-in-callback": "error",
        "promise/no-return-in-finally": "error",
        "promise/no-return-wrap": "error",
        "promise/param-names": "off",
        "promise/prefer-await-to-callbacks": "error",
        "promise/prefer-await-to-then": "error",
        "promise/valid-params": "off", // in favor of TypeScript
        "promise/spec-only": "error",

        ...options.overrides,
      },
    },
  ];
}
