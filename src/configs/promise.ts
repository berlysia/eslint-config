import { GLOB_SRC } from "../globs";
import { pluginPromise } from "../plugins";
import { rulesPromise } from "../rules/promise";
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
      rules: rulesPromise(options),
    },
  ];
}
