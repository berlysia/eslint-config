import { GLOB_SRC } from "../globs";
import { pluginImport } from "../plugins";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsImport(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:import",
      files: [GLOB_SRC],
      plugins: {
        import: pluginImport,
      },
      settings: {
        "import/parsers": {
          espree: [".js", ".cjs", ".mjs", ".jsx", ".cjsx", ".mjsx"],
          "@typescript-eslint/parser": [
            ".ts",
            ".cts",
            ".mts",
            ".tsx",
            ".ctsx",
            ".mtsx",
          ],
        },
        "import/resolver": {
          typescript: true,
          node: true,
        },
      },
      rules: {
        "import/no-unresolved": "off", // よく壊れるしTypeScriptに任せたほうがいい
        "import/default": "off",
        "import/no-absolute-path": "error",
        "import/no-dynamic-require": "error",
        "import/no-self-import": "error",
        "import/export": "error",
        "import/no-named-as-default": "off", // うれしいが、誤爆しやすい
        "import/no-named-as-default-member": "off", // うれしいが、誤爆しやすい
        "import/newline-after-import": "error",
        "import/first": "error",
        "import/no-extraneous-dependencies": "off", // おかしくなりやすい
        "import/no-mutable-exports": "error",
        "import/no-commonjs": "off",
        "import/prefer-default-export": "off",
        "import/no-unassigned-import": "off",
        "import/no-named-default": "error",
        "import/dynamic-import-chunkname": "off",
        "import/exports-last": "off",
        "import/extensions": "off",
        "import/group-exports": "off",
        "import/max-dependencies": "off",
        "import/named": "error",
        "import/namespace": "error",
        "import/no-amd": "error",
        "import/no-anonymous-default-export": "off",
        "import/no-cycle": "off",
        "import/no-default-export": "off",
        "import/no-deprecated": "error",
        "import/no-duplicates": "error",
        "import/no-internal-modules": "off",
        "import/no-named-export": "off",
        "import/no-namespace": "off",
        "import/no-nodejs-modules": "off",
        "import/no-relative-parent-imports": "off",
        "import/no-restricted-paths": "off",
        "import/no-useless-path-segments": "error",
        "import/no-webpack-loader-syntax": "error",
        "import/order": [
          "warn",
          {
            groups: [
              "builtin",
              ["external", "internal"],
              "parent",
              ["sibling", "index"],
            ],
          },
        ],
        "import/unambiguous": "off",
        "import/no-unused-modules": "warn",
        "import/no-import-module-exports": "error",
        "import/no-relative-packages": "error",
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
        "import/no-empty-named-blocks": "error",

        ...options.overrides,
      },
    },
  ];
}
