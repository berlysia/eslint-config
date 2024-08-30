import { existsSync } from "node:fs";
import { isPackageExists } from "local-pkg";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import type { Linter } from "eslint";
import presentRulesOnly, { showAbsence } from "./presentRulesOnly";
import type {
  FlatConfigItem,
  OptionsTestLibrary,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptTsConfigPath,
} from "./types";
import configsComments from "./configs/eslint-comments";
import configsCore from "./configs/eslint-core";
import configsImport from "./configs/import";
import configsUnicorn from "./configs/unicorn";
import configsTypeScript from "./configs/typescript";
import configsTest from "./configs/test";
import configsReact from "./configs/react";
import configsNode from "./configs/node";
import { configFlatGitIgnore, configPrettier } from "./plugins";
import configsJsdoc from "./configs/jsdoc";
import configsJsonc from "./configs/jsonc";
import configsMarkdown from "./configs/markdown";
import configsPromise from "./configs/promise";
import configsIgnores from "./configs/ignores";

type Rules = Record<string, Linter.RuleEntry>;

type Options = {
  typescript?:
    | boolean
    | OptionsTypeScriptTsConfigPath
    | OptionsTypeScriptParserOptions;
  react?: boolean;
  gitignore?: boolean | FlatGitignoreOptions;
  overrides?: {
    core?: Rules;
    typescript?: Rules;
    unicorn?: Rules;
    test?: Rules;
    import?: Rules;
    comments?: Rules;
    react?: Rules;
    node?: Rules;
    jsdoc?: Rules;
    jsonc?: Rules;
    markdown?: Rules;
    promise?: Rules;
  };
} & OptionsTestLibrary;

export default function berlysia(
  options: Options,
  ...userConfigs: FlatConfigItem[]
) {
  const {
    typescript: useTypeScript = isPackageExists("typescript"),
    react: useReact = isPackageExists("react"),
    testLibrary = isPackageExists("vitest")
      ? "vitest"
      : isPackageExists("jest")
        ? "jest"
        : false,
    gitignore: useGitIgnore = true,
  } = options;

  const optionTypeScript =
    typeof useTypeScript === "boolean" ? {} : useTypeScript;

  const isInEditor = Boolean(process.env.VSCODE_PID && !process.env.CI);

  const configs: FlatConfigItem[][] = [];

  if (useGitIgnore) {
    /**
     * DO NOT ADD `name` FIELD OR ANYTHING ELSE TO THIS CONFIG
     * @see https://github.com/humanwhocodes/config-array/blob/26afaaa125f42abc4f9e6d88a9873a61ea66909d/src/config-array.js#L520-L526
     */
    if (typeof useGitIgnore !== "boolean") {
      configs.push([configFlatGitIgnore(useGitIgnore)]);
    } else if (existsSync(".gitignore")) {
      configs.push([configFlatGitIgnore()]);
    }
  }

  configs.push(
    presentRulesOnly(configsIgnores()),
    presentRulesOnly(configsCore({ overrides: options.overrides?.core })),
    presentRulesOnly(
      configsComments({ overrides: options.overrides?.comments }),
    ),
    presentRulesOnly(configsImport({ overrides: options.overrides?.import })),
    presentRulesOnly(configsUnicorn({ overrides: options.overrides?.unicorn })),
    presentRulesOnly(configsNode({ overrides: options.overrides?.node })),
    presentRulesOnly(configsJsdoc({ overrides: options.overrides?.jsdoc })),
    presentRulesOnly(configsJsonc({ overrides: options.overrides?.jsonc })),
    presentRulesOnly(
      configsMarkdown({ overrides: options.overrides?.markdown }),
    ),
    presentRulesOnly(configsPromise({ overrides: options.overrides?.promise })),
  );

  if (useReact) {
    configs.push(
      presentRulesOnly(configsReact({ overrides: options.overrides?.react })),
    );
  }

  if (useTypeScript) {
    configs.push(
      presentRulesOnly(
        configsTypeScript({
          ...optionTypeScript,
          overrides: options.overrides?.typescript,
        }),
      ),
    );
  }

  if (testLibrary) {
    configs.push(
      presentRulesOnly(
        configsTest({
          ...optionTypeScript,
          testLibrary,
          isInEditor,
          overrides: options.overrides?.test,
        }),
      ),
    );
  }

  configs.push([{ name: "berlysia:prettier", ...configPrettier }]);

  const result = [...configs, ...userConfigs].flat();
  showAbsence();
  return result;
}
