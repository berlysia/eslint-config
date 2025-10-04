import type { ParserOptions } from "@typescript-eslint/parser";
import type { FlatConfig, Linter } from "@typescript-eslint/utils/ts-eslint";

export type FlatConfigItem = FlatConfig.Config & {
  name?: string;
};

export type OptionsTypeScriptTsConfigPath = {
  tsConfigPath?: string | string[];
};

export type OptionsTypeScriptParserOptions = {
  parserOptions?: Partial<ParserOptions>;
};

export type OptionsUseTypeScript = {
  useTypeScript?: boolean;
};

export type OptionsTestLibrary = {
  testLibrary: "jest" | "vitest";
};

export type OptionsIsInEditor = {
  isInEditor?: boolean;
};

export type OptionsOverride = {
  overrides?: Record<string, Linter.RuleEntry>;
};
