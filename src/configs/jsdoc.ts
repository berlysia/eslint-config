import { pluginJsdoc } from "../plugins";
import { rulesJsdoc } from "../rules/jsdoc";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsJsdoc(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:jsdoc",
      plugins: {
        jsdoc: pluginJsdoc,
      },
      rules: rulesJsdoc(options),
    },
  ];
}
