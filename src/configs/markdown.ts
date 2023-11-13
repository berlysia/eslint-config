import { GLOB_MARKDOWN, GLOB_SRC } from "../globs";
import { pluginMarkdown, pluginNode, pluginTs } from "../plugins";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsMarkdown(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:markdown:setup",
      plugins: {
        markdown: {
          rules: {},
          ...pluginMarkdown,
        },
        node: pluginNode,
        "@typescript-eslint": pluginTs,
      },
    },
    {
      name: "berlysia:markdown:processor",
      files: [GLOB_MARKDOWN],
      processor: "markdown/markdown",
    },
    {
      name: "berlysia:markdown:rules",
      files: [`${GLOB_MARKDOWN}/${GLOB_SRC}`],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            impliedStrict: true,
          },
        },
      },
      rules: {
        "no-alert": "off",
        "no-console": "off",
        "no-undef": "off",
        "no-unused-expressions": "off",
        "no-unused-vars": "off",
        "unicode-bom": "off",

        "node/prefer-global/process": "off",

        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-redeclare": "off",
        "@typescript-eslint/no-require-imports": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-var-requires": "off",

        ...options.overrides,
      },
    },
  ];
}
