import { GLOB_JSX, GLOB_TSX } from "../globs";
import {
  pluginJsxA11y,
  pluginReact,
  pluginReactHooks,
  pluginReactYouMightNotNeedAnEffect,
} from "../plugins";
import { rulesReact } from "../rules/react";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsReact(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:react",
      files: [GLOB_JSX, GLOB_TSX],
      plugins: {
        react: pluginReact,
        "react-hooks": pluginReactHooks,
        "jsx-a11y": pluginJsxA11y,
        "react-you-might-not-need-an-effect":
          pluginReactYouMightNotNeedAnEffect,
      },

      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: rulesReact(options),
    },
  ];
}
