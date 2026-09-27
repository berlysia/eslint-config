import { GLOB_MARKDOWN, GLOB_SRC } from "../globs";
import {
  pluginMarkdown,
  pluginNode,
  pluginTs,
  pluginUnicorn,
} from "../plugins";
import { rulesMarkdown } from "../rules/markdown";
import type { FlatConfigItem, OptionsOverride } from "../types";

export default function configsMarkdown(
  options: OptionsOverride,
): FlatConfigItem[] {
  return [
    {
      name: "berlysia:markdown:setup",
      plugins: {
        markdown: pluginMarkdown,
        node: pluginNode,
        "@typescript-eslint": pluginTs,
        unicorn: pluginUnicorn,
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
      rules: rulesMarkdown(options),
    },
  ];
}
