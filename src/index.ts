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
import configsSonarjs from "./configs/sonarjs";
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
    sonarjs?: Rules;
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

  const isInEditor = Boolean(process.env.VSCODE_PID && !process.env.CI);

  const configs: FlatConfigItem[][] = [];

  if (useGitIgnore) {
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
    presentRulesOnly(configsSonarjs({ overrides: options.overrides?.sonarjs })),
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
          ...(typeof useTypeScript === "boolean" ? {} : useTypeScript),
          overrides: options.overrides?.typescript,
        }),
      ),
    );
  }

  if (testLibrary) {
    configs.push(
      presentRulesOnly(
        configsTest({
          ...(typeof useTypeScript === "boolean" ? {} : useTypeScript),
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
