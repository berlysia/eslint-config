import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../globs";
import { parserJsonc, pluginJsonc } from "../plugins";
import { rulesJsonc } from "../rules/jsonc";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsJsonc(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:jsonc:setup",
      plugins: {
        jsonc: pluginJsonc,
      },
    },
    {
      name: "berlysia:jsonc:rules",
      files: [GLOB_JSON, GLOB_JSONC, GLOB_JSON5],
      languageOptions: {
        parser: parserJsonc,
      },
      rules: rulesJsonc(options),
    },
  ];
}
