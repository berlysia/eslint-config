import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from "../globs";
import { parserJsonc, pluginJsonc } from "../plugins";
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
      rules: {
        "jsonc/auto": "off",
        "jsonc/key-name-casing": "off",
        "jsonc/no-bigint-literals": "error",
        "jsonc/no-binary-expression": "error",
        "jsonc/no-binary-numeric-literals": "error",
        "jsonc/no-comments": "off",
        "jsonc/no-escape-sequence-in-identifier": "error",
        "jsonc/no-hexadecimal-numeric-literals": "error",
        "jsonc/no-infinity": "error",
        "jsonc/no-nan": "error",
        "jsonc/no-number-props": "error",
        "jsonc/no-numeric-separators": "error",
        "jsonc/no-octal-numeric-literals": "error",
        "jsonc/no-parenthesized": "error",
        "jsonc/no-plus-sign": "error",
        "jsonc/no-regexp-literals": "error",
        "jsonc/no-template-literals": "error",
        "jsonc/no-undefined-value": "error",
        "jsonc/no-unicode-codepoint-escapes": "error",
        "jsonc/sort-array-values": "off",
        "jsonc/sort-keys": "off",
        "jsonc/valid-json-number": "error",
        "jsonc/vue-custom-block/no-parsing-error": "off",

        "jsonc/array-bracket-newline": "off",
        "jsonc/array-bracket-spacing": "off",
        "jsonc/array-element-newline": "off",
        "jsonc/comma-dangle": "off",
        "jsonc/comma-style": "off",
        "jsonc/indent": "off",
        "jsonc/key-spacing": "off",
        "jsonc/no-dupe-keys": "off",
        "jsonc/no-floating-decimal": "off",
        "jsonc/no-irregular-whitespace": "off",
        "jsonc/no-multi-str": "off",
        "jsonc/no-octal-escape": "off",
        "jsonc/no-octal": "off",
        "jsonc/no-sparse-arrays": "off",
        "jsonc/no-useless-escape": "off",
        "jsonc/object-curly-newline": "off",
        "jsonc/object-curly-spacing": "off",
        "jsonc/object-property-newline": "off",
        "jsonc/quote-props": "off",
        "jsonc/quotes": "off",
        "jsonc/space-unary-ops": "off",

        ...options.overrides,
      },
    },
  ];
}
