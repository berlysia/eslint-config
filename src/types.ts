import type { ParserOptions } from "@typescript-eslint/parser";
import type { Linter } from "@typescript-eslint/utils/ts-eslint";
import type { FlatESLintConfig } from "eslint-define-config";

export type FlatConfigItem = FlatESLintConfig & {
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
