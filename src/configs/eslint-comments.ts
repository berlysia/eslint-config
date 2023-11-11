import { GLOB_SRC } from "../globs";
import { pluginComments } from "../plugins";
import type { FlatConfigItem } from "../types";

export default function configsComments(): FlatConfigItem[] {
  return [
    {
      name: "berlysia:eslint-comments",
      files: [GLOB_SRC],
      plugins: {
        "eslint-comments": pluginComments,
      },
      rules: {
        "eslint-comments/disable-enable-pair": [
          "error",
          { allowWholeFile: true },
        ],
        "eslint-comments/no-aggregating-enable": "error",
        "eslint-comments/no-duplicate-disable": "error",
        "eslint-comments/no-restricted-disable": "off",
        "eslint-comments/no-unlimited-disable": "error",
        "eslint-comments/no-unused-disable": "error",
        "eslint-comments/no-unused-enable": "error",
        "eslint-comments/no-use": "off",
        "eslint-comments/require-description": "error",
      },
    },
  ];
}
