/**
 * CLI用型定義
 */

export interface CliOptions {
  interactive: boolean;
  typescript?: boolean;
  react?: boolean;
  testLibrary?: "vitest" | "jest" | "none";
  dryRun: boolean;
  output: string;
  help: boolean;
}

export interface InteractivePromptConfig {
  message: string;
  defaultValue: boolean | string;
}
