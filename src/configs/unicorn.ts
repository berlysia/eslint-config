import { GLOB_SRC } from "../globs";
import { pluginUnicorn } from "../plugins";
import { rulesUnicorn } from "../rules/unicorn";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsUnicorn(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:unicorn",
      files: [GLOB_SRC],
      plugins: {
        unicorn: pluginUnicorn,
      },
      rules: rulesUnicorn(options),
    },
  ];
}
