import type { FlatESLintConfigItem } from "eslint-define-config";

export type FlatConfigItem = Omit<FlatESLintConfigItem, "plugins"> & {
  name?: string;
  plugins?: Record<string, unknown>;
};

export type OptionsTypeScript = {
  tsConfigPath?: string | string[];
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
