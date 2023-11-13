import type { ParserOptions } from "@typescript-eslint/parser";
import type { FlatESLintConfigItem } from "eslint-define-config";

export type FlatConfigItem = Omit<FlatESLintConfigItem, "plugins"> & {
  name?: string;
  plugins?: Record<string, unknown>;
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
