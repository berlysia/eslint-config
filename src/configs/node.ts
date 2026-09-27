import { GLOB_SRC } from "../globs";
import { pluginNode } from "../plugins";
import { rulesNode } from "../rules/node";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsNode(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:node",
      files: [GLOB_SRC],
      plugins: {
        node: pluginNode,
      },
      rules: rulesNode(options),
    },
  ];
}
