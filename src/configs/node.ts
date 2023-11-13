import { GLOB_SRC } from "../globs";
import { pluginNode } from "../plugins";
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
      rules: {
        "node/callback-return": "error",
        "node/exports-style": "off",
        "node/file-extension-in-import": "off",
        "node/global-require": "off",
        "node/handle-callback-err": "error",
        "node/no-callback-literal": "off",
        "node/no-deprecated-api": "error",
        "node/no-exports-assign": "error",
        "node/no-extraneous-import": "off",
        "node/no-extraneous-require": "off",
        "node/no-missing-import": "off",
        "node/no-missing-require": "off",
        "node/no-mixed-requires": "off",
        "node/no-new-require": "error",
        "node/no-path-concat": "error",
        "node/no-process-env": "off",
        "node/no-process-exit": "off",
        "node/no-restricted-import": "off",
        "node/no-restricted-require": "off",
        "node/no-sync": "off",
        "node/no-unpublished-bin": "off",
        "node/no-unpublished-import": "off",
        "node/no-unpublished-require": "off",
        "node/no-unsupported-features/es-builtins": "off",
        "node/no-unsupported-features/es-syntax": "off",
        "node/no-unsupported-features/node-builtins": "off",
        "node/prefer-global/buffer": "error",
        "node/prefer-global/console": "error",
        "node/prefer-global/process": "error",
        "node/prefer-global/text-decoder": "error",
        "node/prefer-global/text-encoder": "error",
        "node/prefer-global/url": "error",
        "node/prefer-global/url-search-params": "error",
        "node/prefer-promises/dns": "error",
        "node/prefer-promises/fs": "error",
        "node/process-exit-as-throw": "error",
        "node/shebang": "error",

        ...options.overrides,
      },
    },
  ];
}
