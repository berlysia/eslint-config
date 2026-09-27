import { GLOB_SRC } from "../globs";
import { pluginComments } from "../plugins";
import { rulesComments } from "../rules/eslint-comments";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsComments(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:eslint-comments",
      files: [GLOB_SRC],
      plugins: {
        "eslint-comments": pluginComments,
      },
      rules: rulesComments(options),
    },
  ];
}
