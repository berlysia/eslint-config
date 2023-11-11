import { isPackageExists } from "local-pkg";
import presentRulesOnly, { showAbsence } from "./presentRulesOnly";
import type { FlatConfigItem, OptionsTypeScript } from "./types";
import configsComments from "./configs/eslint-comments";
import configsCore from "./configs/eslint-core";
import configsImport from "./configs/import";
import configsUnicorn from "./configs/unicorn";
import configsSonarjs from "./configs/sonarjs";
import configsTypeScript from "./configs/typescript";
import configsJest from "./configs/jest";
import configsReact from "./configs/react";
import { configPrettier } from "./plugins";

interface Options {
  typescript?: boolean | OptionsTypeScript;
  react?: boolean;
  test?: boolean;
}

export default function berlysia(
  options: Options,
  ...userConfigs: FlatConfigItem[]
) {
  const {
    typescript: useTypeScript = isPackageExists("typescript"),
    react: useReact = isPackageExists("react"),
    test: useTest = isPackageExists("jest"),
  } = options;

  const configs: FlatConfigItem[][] = [];

  configs.push(
    presentRulesOnly(configsCore()),
    presentRulesOnly(configsComments()),
    presentRulesOnly(configsImport()),
    presentRulesOnly(configsUnicorn()),
    presentRulesOnly(configsSonarjs())
  );

  if (useReact) {
    configs.push(presentRulesOnly(configsReact()));
  }

  if (useTypeScript) {
    configs.push(
      presentRulesOnly(
        configsTypeScript({
          ...(typeof useTypeScript === "boolean" ? {} : useTypeScript),
        })
      )
    );
  }

  if (useTest) {
    configs.push(
      presentRulesOnly(
        configsJest({
          useTypeScript: Boolean(useTypeScript),
        })
      )
    );
  }

  configs.push(configPrettier);

  const result = [...configs, ...userConfigs].flat();
  showAbsence();
  return result;
}
