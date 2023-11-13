import { existsSync } from "node:fs";
import { isPackageExists } from "local-pkg";
import type { FlatGitignoreOptions } from "eslint-config-flat-gitignore";
import presentRulesOnly, { showAbsence } from "./presentRulesOnly";
import type {
  FlatConfigItem,
  OptionsTestLibrary,
  OptionsTypeScript,
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

type Options = {
  typescript?: boolean | OptionsTypeScript;
  react?: boolean;
  gitignore?: boolean | FlatGitignoreOptions;
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
    presentRulesOnly(configsCore()),
    presentRulesOnly(configsComments()),
    presentRulesOnly(configsImport()),
    presentRulesOnly(configsUnicorn()),
    presentRulesOnly(configsSonarjs()),
    presentRulesOnly(configsNode()),
    presentRulesOnly(configsJsdoc()),
    presentRulesOnly(configsJsonc()),
    presentRulesOnly(configsMarkdown()),
    presentRulesOnly(configsPromise()),
  );

  if (useReact) {
    configs.push(presentRulesOnly(configsReact()));
  }

  if (useTypeScript) {
    configs.push(
      presentRulesOnly(
        configsTypeScript({
          ...(typeof useTypeScript === "boolean" ? {} : useTypeScript),
        }),
      ),
    );
  }

  if (testLibrary) {
    configs.push(
      presentRulesOnly(
        configsTest({
          useTypeScript: Boolean(useTypeScript),
          testLibrary,
          isInEditor,
        }),
      ),
    );
  }

  configs.push([{ name: "berlysia:prettier", ...configPrettier }]);

  const result = [...configs, ...userConfigs].flat();
  showAbsence();
  return result;
}
