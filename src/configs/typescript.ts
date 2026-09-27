import type { ParserOptions } from "@typescript-eslint/parser";
import { GLOB_DTS, GLOB_TS, GLOB_TSX } from "../globs";
import { parserTs, pluginImport, pluginTs } from "../plugins";
import { nonTypeAwareRules, typeAwareRules } from "../rules/typescript";
import type {
  FlatConfigItem,
  OptionsOverride,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptTsConfigPath,
} from "../types";

export { nonTypeAwareRules, typeAwareRules } from "../rules/typescript";

export default function configsTypeScript(
  options: OptionsTypeScriptTsConfigPath &
    OptionsTypeScriptParserOptions &
    OptionsOverride,
): FlatConfigItem[] {
  const tsConfigPath = options.tsConfigPath
    ? [options.tsConfigPath].flat()
    : undefined;
  const { parserOptions, overrides } = options;

  return [
    {
      name: "berlysia:typescript",
      files: [GLOB_TS, GLOB_TSX],
      ignores: [GLOB_DTS],
      plugins: {
        "@typescript-eslint": pluginTs,
        import: pluginImport,
      },
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          warnOnUnsupportedTypeScriptVersion: false,
          sourceType: "module",
          ...(tsConfigPath
            ? { project: tsConfigPath, tsconfigRootDir: process.cwd() }
            : {}),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- TS plugins parserOptions type is more specialized
          ...(parserOptions as ParserOptions),
        },
      },

      settings: {
        "import-x/resolver": {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        ...nonTypeAwareRules.rules,
        ...(tsConfigPath ? typeAwareRules.rules : {}),

        ...overrides,
      },
    },
  ];
}
