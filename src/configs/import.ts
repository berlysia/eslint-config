import { GLOB_SRC } from "../globs";
import { pluginImport } from "../plugins";
import { rulesImport } from "../rules/import";
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
        "import-x/parsers": {
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
        "import-x/resolver": {
          typescript: true,
          node: true,
        },
      },
      rules: rulesImport(options),
    },
  ];
}
