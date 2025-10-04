import { GLOB_MARKDOWN, GLOB_SRC } from "../globs";
import {
  pluginMarkdown,
  pluginNode,
  pluginTs,
  pluginUnicorn,
} from "../plugins";
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

        "unicorn/prefer-module": "off",

        "markdown/fenced-code-language": "off",
        "markdown/heading-increment": "off",
        "markdown/no-bare-urls": "off",
        "markdown/no-duplicate-definitions": "off",
        "markdown/no-invalid-label-refs": "off",
        "markdown/no-missing-atx-heading-space": "off",
        "markdown/no-missing-label-refs": "off",
        "markdown/no-missing-link-fragments": "off",
        "markdown/no-multiple-h1": "off",
        "markdown/no-reference-like-urls": "off",
        "markdown/no-reversed-media-syntax": "off",
        "markdown/no-space-in-emphasis": "off",
        "markdown/no-unused-definitions": "off",
        "markdown/require-alt-text": "off",
        "markdown/table-column-count": "off",
        "markdown/no-duplicate-headings": "off",
        "markdown/no-empty-definitions": "off",
        "markdown/no-empty-images": "off",
        "markdown/no-empty-links": "off",
        "markdown/no-html": "off",

        ...options.overrides,
      },
    },
  ];
}
